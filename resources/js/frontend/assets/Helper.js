export function convertToFormData(data) {
  const formData = new FormData()

  for (let item in data) {
    formData.append(item, data[item])
  }

  return formData
}

export function parseForm(data) {
  const items = {}

  for (const item of data) {
    if (
      item.disabled ||
      item.value.trim() == '' ||
      ((item.type == 'radio' || item.type == 'checkbox') && !item.checked) ||
      (item.type == 'file' && !item.files.count === 0)
    )
      continue

    items[item.name] = item.value
  }

  return items
}
