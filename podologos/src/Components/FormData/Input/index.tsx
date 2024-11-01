import React, { useState } from 'react';

export const GenericField = ({ field, placeholder, label, ...props }: any) => (
  <div className='flex flex-col font-[500]'>
    <p>{label}</p>
    <input
      {...field}
      {...props}
      type='text'
      placeholder={placeholder}
      className='h-[50px] rounded-xl bg-cinza/20 px-4'
    ></input>
  </div>
);

export const GenericPasswordField = ({
  field,
  placeholder,
  label,
  ...props
}: any) => (
  <div className='flex flex-col font-[500]'>
    <p>{label}</p>
    <input
      {...field}
      {...props}
      type='password'
      placeholder={placeholder}
      className='h-[50px] rounded-md bg-cinza/20 px-4'
    ></input>
  </div>
);
