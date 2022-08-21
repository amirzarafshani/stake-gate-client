import React, { Component } from 'react';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';

const UploadAttachment = props => {
  const { label, error, onChange } = props

  const handleChange = e => {
    e.preventDefault()
    if (e.target.files) {
      onChange(e.target.files[0])
    }
  }

  return (
    <React.Fragment>
      <label
        htmlFor="image"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        class={`form-control block  w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid shadow-sm rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none 
        ${error ? 'border-red-500' : 'border-gray-200'}
        `}
        onChange={handleChange}
        type="file"
        id="image" />
      <p class="mt-1 text-sm text-gray-500" id="file_input_help">JPG, PNG or GIF</p>
    </React.Fragment>
  )
}

export default UploadAttachment;
