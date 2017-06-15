export const copyText = (text) => {
  console.log(text)
  const textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.select()

  try {
    // document.execCommand('copy')
    const successful = document.execCommand('copy')
    if (successful) {
      console.log('复制成功')
    } else {
      console.log('复制失败，请右键页面链接复制')
    }
  } catch (err) {
    console.log('无法复制，请右键页面链接复制')
  }
  document.body.removeChild(textArea)
}
