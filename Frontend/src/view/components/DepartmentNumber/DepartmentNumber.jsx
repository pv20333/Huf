import React from 'react';

function DepartmentNumber() {
    const departmentNumber = localStorage.getItem('departmentNumber');

    return (
        <div>
            <p>{departmentNumber}</p>
        </div>
    );
}

export default DepartmentNumber;
