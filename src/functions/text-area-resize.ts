export const handleTextareaResize = (
  e: React.ChangeEvent<HTMLTextAreaElement>,
) => {
  e.target.style.height = 'auto'
  e.target.style.height = e.target.scrollHeight + 'px'
}
