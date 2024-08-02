import axios from 'axios'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { useEffect, useState } from 'react'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const ImageInput = ({ handleState, type, image }) => {
  const [files, setFiles] = useState([])

  useEffect(() => {
    if (type === 'update') {
      setFiles([
        {
          source: image,
          options: { type: 'local' },
        },
      ])
    }
  }, [type, image])

  const serverOptions = () => {
    if (type === 'add') {
      return {
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          const data = new FormData()
          data.append('file', file)
          data.append('upload_preset', 'ecommerce')
          data.append('cloud_name', 'dau29thsb')
          data.append('public_id', file.name)
          axios
            .post(
              'https://api.cloudinary.com/v1_1/dau29thsb/image/upload',
              data
            )
            .then((response) => response.data)
            .then((data) => {
              handleState(data.url)
              load(data)
            })
            .catch((error) => {
              console.error('Error uploading file:', error)
              error('Upload failed')
              abort()
            })
        },
      }
    } else if (type === 'update') {
      return {
        load: (source, load, error, progress, abort, headers) => {
          var myRequest = new Request(source)
          fetch(myRequest).then(function (response) {
            response.blob().then(function (myBlob) {
              load(myBlob)
            })
          })
        },
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          const data = new FormData()
          data.append('file', file)
          data.append('upload_preset', 'ecommerce')
          data.append('cloud_name', 'dau29thsb')
          data.append('public_id', file.name)
          axios
            .post(
              'https://api.cloudinary.com/v1_1/dau29thsb/image/upload',
              data
            )
            .then((response) => response.data)
            .then((data) => {
              console.log(data)
              handleState(data.url)
              load(data)
            })
            .catch((error) => {
              console.error('Error uploading file:', error)
              error('Upload failed')
              abort()
            })
        },
      }
    }
  }
  return (
    <div className="sm:col-span-6">
      <label
        htmlFor="image"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Image
      </label>
      <div style={{ width: '80%', margin: 'auto', padding: '1%' }}>
        <FilePond
          files={files}
          acceptedFileTypes="image/*"
          onupdatefiles={setFiles}
          allowMultiple={false}
          server={serverOptions()}
          name="file"
          required
        />
      </div>
    </div>
  )
}

export default ImageInput
