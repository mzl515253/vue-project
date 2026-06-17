


export  default  function useAnchor()   {
const scrollToRef = (refId: string) => {
  console.log(
    '滚动到元素',
    refId
  );
  
  const ref = document.getElementById(refId)
  if (ref) {
    ref.scrollIntoView({ behavior: 'smooth' })
  }
}

return {
  scrollToRef
}

}


