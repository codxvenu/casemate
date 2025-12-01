export function handleSize(i){
      const size = (i/1024).toFixed(2)
      if(size < 1000) return `${(i/1024).toFixed(2)} KB`
      return `${(size/1024).toFixed(2)} MB`
    }