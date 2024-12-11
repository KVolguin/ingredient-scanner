import React, { useState, useEffect } from 'react';

const FileList = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/files')
            .then((response) => response.json())
            .then((data) => setFiles(data))
            .catch((error) => console.error('Error fetching files:', error));
    }, []);

    return (
        <div>
            <h1>Uploaded Files</h1>
            <ul>
                {files.length > 0 ? (
                    files.map((file) => (
                        <li key={file.id}>
                            {file.filename} - Uploaded at: {new Date(file.uploaded_at).toLocaleString()}
                        </li>
                    ))
                ) : (
                    <p>No files uploaded yet.</p>
                )}
            </ul>
        </div>
    );
};

export default FileList;
