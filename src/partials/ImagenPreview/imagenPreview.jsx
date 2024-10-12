import { useEffect, useState } from 'react';
import './ImagenPreview.css'

export function ImagenPreview({ file }) {
    const { id, url, name } = file;

    return <>
        <div className='' data-file={id}>
            <img src={url} alt={name} />
        </div>
    </>
}