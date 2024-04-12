
const Constant = () => {

  
  const convertNanosecondsToTimestamp = (nanoseconds: bigint | undefined) => {
    try {
      if (nanoseconds === undefined) {
        return "";
      }

      const milliseconds = Number(nanoseconds) / 1000000; 
      const date = new Date(milliseconds); 

      
      const month = date.toLocaleString("default", { month: "short" }); 
      const day = date.getDate(); 
      const year = date.getFullYear(); 
      const hour = date.getHours(); 
      const minute = date.getMinutes(); 

      
      const timestamp = `${month} ${day},${year}; ${hour}:${minute < 10 ? "0" + minute : minute
        }`;

      return timestamp.toString();
    } catch (err) {
      console.error("Error: ", err);
      return "";
    }
  };

  
  const convertNanosecondsToTimeAgo = (nanoseconds: bigint | undefined): string => {
    if (nanoseconds === undefined) {
      return "";
    }

    const currentTime = Date.now();
    const timeInMillis = Number(nanoseconds) / 1000000; 
    const timeDifference = currentTime - timeInMillis;

    
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    }
  };

  
  const convertInt8ToBase64 = (int8Array: Int8Array | undefined) => {
    try {
      if (int8Array == undefined) {
        return "";
      }
      
      const base64 = "data:image/jpeg;base64," + btoa(String.fromCharCode(...new Uint8Array(int8Array)));

      return base64;
    } catch (err) {
      console.error("Error: ", err);
      return "";
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    return new Promise<{ int8Array: Int8Array, base64: string }>((resolve, reject) => {
      const file = event.target.files?.[0];

      if (!file) return reject('No file selected');

      const maxSize = 1.7 * 1024 * 1024; 

      if (file.size > maxSize) {
        return reject('File size exceeds the limit of 1.7MB');
      }

      if (!file.type.startsWith('image')) {
        return reject('Please upload an image file');
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const img = new Image();
          img.src = e.target.result.toString();

          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) return reject('Could not create canvas context');

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            const quality = 0.7; 
            const dataURL = canvas.toDataURL('image/jpeg', quality);

            
            fetch(dataURL)
              .then((res) => res.blob())
              .then(async (blob) => {
                
                const arrayBuffer = await blob.arrayBuffer();

                
                const int8Array = new Int8Array(arrayBuffer);

                
                const base64 = "data:image/jpeg;base64," + btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

                
                resolve({ int8Array, base64 });
              })
              .catch((error) => reject(error));
          };
        }
      };

      reader.onerror = () => reject('Error reading file');

      reader.readAsDataURL(file);
    });
  };

  
  return { convertNanosecondsToTimestamp, handleFileUpload, convertInt8ToBase64, convertNanosecondsToTimeAgo };
};

export default Constant;
