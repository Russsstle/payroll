export function parseForm(data) {
  const formData = new FormData()

  for (const item of data) {
    if (
      item.disabled ||
      item.value.trim() == '' ||
      ((item.type == 'radio' || item.type == 'checkbox') && !item.checked) ||
      (item.type == 'file' && item.files.length === 0)
    )
      continue

    formData.append(item.name, item.type == 'file' ? item.files[0] : item.value)
  }

  return formData
}
