import * as Jimp from 'jimp';
import Tesseract from 'tesseract.js';

const handleImagesComparison = async (file: any, role: string) => {
   return Jimp.read(file)
     .then(async (userIdImage) => {
       // Apply image quality enhancements to the userIdImage
        userIdImage
          .contrast(0.7) // Adjust contrast (values between -1 and 1)
          .brightness(0.5) // Adjust brightness (values between -1 and 1)
          .quality(100); // Set quality to 100 for PNG

        // Convert the enhanced image to a buffer
        const enhancedImageBuffer = await userIdImage.getBufferAsync(Jimp.MIME_PNG);

        // Recognize text from the enhanced user ID image
        const {
          data: { text },
        } = await Tesseract.recognize(enhancedImageBuffer, 'eng');

        if (text) {
          // Define a regular expression to match capitalized words, single letters with a dot, and numbers with more than three digits
          const regex = /[A-Z][A-Z]+|[A-Z]\.|\b\d{4,}\b/g;
          // Define regular expressions to match specific patterns
          const idNumberRegex = /(\d{8})/g; // Match numbers with more than three digits

          // Match and extract the name, department, role, and ID number using regular expressions
          const departmentRegex = /(BSIT|BEED|BSHM|BSED|BSED-ENG|BSED-FIL|BSED-SCI|IT|EDUCATION|HM)\b/g; // Matches department codes

          // Use the regular expression to find matches in the input text
          const matches = text.match(regex);
          const idNumbers = text.match(idNumberRegex);
          const departments = text.match(departmentRegex);

          // Define the words and phrases to remove
          const wordsAndPhrasesToRemove = [ 'REPUBLIC', 'OF', 'THE', 'PHILIPPINES', 'CORDOVA', 'PUBLIC', 'COLLEGE', 'MUNICIPALITY', 'PUB', 'LIC', 'GABL', 'CORDGVA', 'CEBU', '6170', 'COL', 'LEGE', 'NAME', 'STUDENT NAME', 'ID', 'ID NUMBER', 'ENG', 'SCI', 'SCIENCE', 'FIL', 'FILIPINO', 'BER', 'ID', 'NUMBER', 'SIGNATURE', 'DEPARTMENT', 'FOUNDED', '2005', '2008', ];

          // Filter out the words and phrases to remove
          const filteredMatches = matches?.filter(
            (match) => !wordsAndPhrasesToRemove.includes(match),
          );

          // Define the array to store the filtered elements
          const filteredArray: any = [];

          // Iterate through the filtered matches and add them to the array
          filteredMatches?.forEach((match) => {
            // Filter out non-alphanumeric characters
            const alphanumericMatch = match.replace(/[^A-Z\d.]/g, '');
            // Add to the array if not empty
            if (alphanumericMatch.length > 0) {
              filteredArray.push(alphanumericMatch);
            }
          });
          const indexIdNumber = filteredArray.indexOf(idNumbers && idNumbers[0]);
          const indexDepartment = filteredArray.indexOf(
            departments && departments[departments.length - 1],
          );
          const roleIndex = role.toUpperCase() === 'FACULTY STAFF' ? filteredArray.indexOf('INSTRUCTOR') : filteredArray.indexOf(role.toUpperCase());
          const valueFromDepartmentToIdNumber = filteredArray.slice(
            indexDepartment,
            indexIdNumber,
          );
          const sortOrder = (value: string) => {
            // Check if the value is a department (e.g., IT, EDUCATION, HM, BEED, BSHM, BSED)
            if (departmentRegex.test(value)) {
              return -1; // Move departments to the beginning
            } else if (idNumberRegex.test(value)) {
              return 1; // Move ID numbers to the end
            }
            return 0; // Keep the order of other values
          };
          valueFromDepartmentToIdNumber.push(idNumbers && idNumbers[0]);
          valueFromDepartmentToIdNumber.sort(
            (a: any, b: any) => sortOrder(a) - sortOrder(b),
          );
          if (roleIndex !== -1) {
            if (role.toUpperCase() === 'STUDENT') {
              const studentIndex = valueFromDepartmentToIdNumber.indexOf(role.toUpperCase())
              valueFromDepartmentToIdNumber.splice(studentIndex,1);
              return { status: 200, valueFromDepartmentToIdNumber };
            } else if (role.toUpperCase() === 'INSTRUCTOR' || role.toUpperCase() === 'FACULTY STAFF') {
              filteredArray.sort((a: string, b: string) => sortOrder(a) - sortOrder(b));
              filteredArray.splice(roleIndex,1);
              return { status: 200, valueFromDepartmentToIdNumber: filteredArray };
            } else {
              return { message: 'Choose correct role', status: 404 };
            }
          } else {
            return { message: 'Invalid ID or Select your role', stats: 409 }
          }
        } else {
          console.log('No text detected in the user ID image.');
          return {  message: 'Invalid ID image', status: 404 };
        }
     })
    .catch((error) => {
      console.error('Image compare error: ', error);
      return { message: 'Image compare error', error: error}
    })
};

export {
  handleImagesComparison,
};

