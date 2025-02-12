// import React, { useState } from 'react';
// import { Inertia } from '@inertiajs/inertia';

// const ClientCreate = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         father_name: '',
//         mother_name: '',
//         phone_number: '',
//         date_of_birth: '',
//         nid_number: '',
//         nid_pic_font: null,
//         nid_pic_back: null,
//         pic: null,
//         occupation: '',
//         monthly_income: '',
//         present_district: '',
//         present_upazila: '',
//         present_village: '',
//         present_postcode: '',
//         permanent_district: '',
//         permanent_upazila: '',
//         permanent_postcode: '',
//         permanent_village: '',
//         email: '',
//         number: '',
//         emergency_contact_name: '',
//         guarantor_name: '',
//         guarantor_nid: '',
//         guarantor_nid_pic_font: null,
//         guarantor_nid_pic_back: null,
//         guarantor_pic: null,
//         guarantor_address: '',
//         guarantor_occupation: '',
//         guarantor_monthly_income: '',
//         guarantor_phone_number: '',
//         guarantor_email: '',
//         guarantor_pic: null,
//         guarantor_relation: '',
//     });

//     const [errors, setErrors] = useState({});

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (files) {
//             setFormData({ ...formData, [name]: files[0] });
//         } else {
//             setFormData({ ...formData, [name]: value });
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const data = new FormData();
//         Object.keys(formData).forEach(key => {
//             data.append(key, formData[key]);
//         });

//         Inertia.post('/clients/store', data, {
//             onError: (errors) => {
//                 setErrors(errors);
//             }
//         });
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
//             <h2 className="text-2xl font-bold mb-6">Create Client</h2>
//             <form onSubmit={handleSubmit} encType="multipart/form-data">
//                 {Object.keys(formData).map((field, index) => (
//                     <div key={index} className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
//                             {field.replace(/_/g, ' ').toUpperCase()}
//                         </label>
//                         <input
//                             type={field.includes('pic') ? 'file' : field === 'date_of_birth' ? 'date' : 'text'}
//                             name={field}
//                             id={field}
//                             onChange={handleChange}
//                             className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors[field] ? 'border-red-500' : ''}`}
//                         />
//                         {errors[field] && <p className="text-red-500 text-xs italic">{errors[field]}</p>}
//                     </div>
//                 ))}
//                 <div className="flex items-center justify-between">
//                     <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                         Create Client
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default ClientCreate;



// import React, { useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const ClientCreate = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         father_name: '',
//         mother_name: '',
//         phone_number: '',
//         date_of_birth: '',
//         nid_number: '',
//         nid_pic_font: null,
//         nid_pic_back: null,
//         pic: null,
//         occupation: '',
//         monthly_income: '',
//         present_district: '',
//         present_upazila: '',
//         present_village: '',
//         present_postcode: '',
//         permanent_district: '',
//         permanent_upazila: '',
//         permanent_postcode: '',
//         permanent_village: '',
//         email: '',
//         number: '',
//         emergency_contact_name: '',
//         guarantor_name: '',
//         guarantor_nid: '',
//         guarantor_nid_pic_font: null,
//         guarantor_nid_pic_back: null,
//         guarantor_pic: null,
//         guarantor_address: '',
//         guarantor_occupation: '',
//         guarantor_monthly_income: '',
//         guarantor_phone_number: '',
//         guarantor_email: '',
//         guarantor_relation: '',
//     });

//     const [errors, setErrors] = useState({});

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('/clients/store', formData);

//             if (response.data.success) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Success!',
//                     text: response.data.message,
//                     timer: 2000,
//                     showConfirmButton: false,
//                 });

//                 setFormData({
//                     name: '',
//                     father_name: '',
//                     mother_name: '',
//                     phone_number: '',
//                     date_of_birth: '',
//                     nid_number: '',
//                     nid_pic_font: null,
//                     nid_pic_back: null,
//                     pic: null,
//                     occupation: '',
//                     monthly_income: '',
//                     present_district: '',
//                     present_upazila: '',
//                     present_village: '',
//                     present_postcode: '',
//                     permanent_district: '',
//                     permanent_upazila: '',
//                     permanent_postcode: '',
//                     permanent_village: '',
//                     email: '',
//                     number: '',
//                     emergency_contact_name: '',
//                     guarantor_name: '',
//                     guarantor_nid: '',
//                     guarantor_nid_pic_font: null,
//                     guarantor_nid_pic_back: null,
//                     guarantor_pic: null,
//                     guarantor_address: '',
//                     guarantor_occupation: '',
//                     guarantor_monthly_income: '',
//                     guarantor_phone_number: '',
//                     guarantor_email: '',
//                     guarantor_relation: '',
//                 });
//                 setErrors({});
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 422) {
//                 setErrors(error.response.data.errors);
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Validation Error!',
//                     text: 'Please check the form and correct the errors.',
//                 });
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error!',
//                     text: 'Something went wrong. Please try again.',
//                 });
//             }
//         }
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
//             <h2 className="text-2xl font-bold mb-6">Create Client</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="grid grid-cols-3 gap-4 mb-4">
//                     {Object.keys(formData).map((field, index) => (
//                         <div key={index}>
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
//                                 {field.replace(/_/g, ' ').toUpperCase()} <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 type={field === 'date_of_birth' ? 'date' : 'text'}
//                                 name={field}
//                                 id={field}
//                                 value={formData[field]}
//                                 onChange={handleChange}
//                                 className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors[field] ? 'border-red-500' : ''}`}
//                             />
//                             {errors[field] && <p className="text-red-500 text-xs italic">{errors[field][0]}</p>}
//                         </div>
//                     ))}
//                 </div>
//                 <div className="flex items-center justify-between">
//                     <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                         Create Client
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default ClientCreate;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const ClientCreate = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         father_name: '',
//         mother_name: '',
//         phone_number: '',
//         date_of_birth: '',
//         nid_number: '',
//         nid_pic_font: null,
//         nid_pic_back: null,
//         pic: null,
//         occupation: '',
//         monthly_income: '',
//         present_district: '',
//         present_upazila: '',
//         present_village: '',
//         present_postcode: '',
//         permanent_district: '',
//         permanent_upazila: '',
//         permanent_postcode: '',
//         permanent_village: '',
//         email: '',
//         number: '',
//         emergency_contact_name: '',
//         guarantor_name: '',
//         guarantor_nid: '',
//         guarantor_nid_pic_font: null,
//         guarantor_nid_pic_back: null,
//         guarantor_pic: null,
//         guarantor_address: '',
//         guarantor_occupation: '',
//         guarantor_monthly_income: '',
//         guarantor_phone_number: '',
//         guarantor_email: '',
//         guarantor_relation: '',
//     });

//     const [errors, setErrors] = useState({});

//     useEffect(() => {
//         // Load images from localStorage on component mount
//         const savedImages = JSON.parse(localStorage.getItem('clientFormImages')) || {};
//         setFormData(prevData => ({ ...prevData, ...savedImages }));
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const handleFileChange = (e) => {
//         const { name, files } = e.target;
//         const file = files[0];

//         if (file) {
//             const reader = new FileReader();

//             reader.onloadend = () => {
//                 const newFormData = { ...formData, [name]: reader.result };
//                 setFormData(newFormData);

//                 // Save images to localStorage (only images related to the form)
//                 localStorage.setItem('clientFormImages', JSON.stringify({ [name]: reader.result }));
//             };

//             reader.readAsDataURL(file); // Reads the image file as a data URL
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('/clients/store', formData);

//             if (response.data.success) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Success!',
//                     text: response.data.message,
//                     timer: 2000,
//                     showConfirmButton: false,
//                 });

//                 setFormData({
//                     name: '',
//                     father_name: '',
//                     mother_name: '',
//                     phone_number: '',
//                     date_of_birth: '',
//                     nid_number: '',
//                     nid_pic_font: null,
//                     nid_pic_back: null,
//                     pic: null,
//                     occupation: '',
//                     monthly_income: '',
//                     present_district: '',
//                     present_upazila: '',
//                     present_village: '',
//                     present_postcode: '',
//                     permanent_district: '',
//                     permanent_upazila: '',
//                     permanent_postcode: '',
//                     permanent_village: '',
//                     email: '',
//                     number: '',
//                     emergency_contact_name: '',
//                     guarantor_name: '',
//                     guarantor_nid: '',
//                     guarantor_nid_pic_font: null,
//                     guarantor_nid_pic_back: null,
//                     guarantor_pic: null,
//                     guarantor_address: '',
//                     guarantor_occupation: '',
//                     guarantor_monthly_income: '',
//                     guarantor_phone_number: '',
//                     guarantor_email: '',
//                     guarantor_relation: '',
//                 });
//                 setErrors({});

//                 // Clear images from localStorage
//                 localStorage.removeItem('clientFormImages');
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 422) {
//                 setErrors(error.response.data.errors);
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Validation Error!',
//                     text: 'Please check the form and correct the errors.',
//                 });
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error!',
//                     text: 'Something went wrong. Please try again.',
//                 });
//             }
//         }
//     };

//     const renderFormSection = (fields, headline) => (
//         <div className="mb-8">
//             <h3 className="text-xl font-bold mb-4">{headline}</h3>
//             <div className="grid grid-cols-3 gap-4">
//                 {fields.map((field) => (
//                     <div key={field}>
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
//                             {field.replace(/_/g, ' ').toUpperCase()} <span className="text-red-500">*</span>
//                         </label>
//                         {field.includes('pic') || field.includes('nid_pic') ? (
//                             <>
//                                 <input
//                                     type="file"
//                                     name={field}
//                                     id={field}
//                                     onChange={handleFileChange}
//                                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 />
//                                 {formData[field] && (
//                                     <img src={formData[field]} alt={field} className="mt-2 w-20 h-20 object-cover" />
//                                 )}
//                             </>
//                         ) : (
//                             <input
//                                 type={field === 'date_of_birth' ? 'date' : 'text'}
//                                 name={field}
//                                 id={field}
//                                 value={formData[field]}
//                                 onChange={handleChange}
//                                 className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors[field] ? 'border-red-500' : ''}`}
//                             />
//                         )}
//                         {errors[field] && <p className="text-red-500 text-xs italic">{errors[field][0]}</p>}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );

//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
//             <h2 className="text-2xl font-bold mb-6">Create Client</h2>
//             <form onSubmit={handleSubmit}>
//                 {renderFormSection(['name', 'father_name', 'mother_name', 'phone_number', 'date_of_birth'], 'Personal Information')}
//                 {renderFormSection(['nid_number', 'nid_pic_font', 'nid_pic_back', 'pic'], 'NID Information')}
//                 {renderFormSection(['occupation', 'monthly_income', 'present_district', 'present_upazila', 'present_village', 'present_postcode'], 'Present Address')}
//                 {renderFormSection(['permanent_district', 'permanent_upazila', 'permanent_village', 'permanent_postcode'], 'Permanent Address')}
//                 {renderFormSection(['email', 'number', 'emergency_contact_name', 'guarantor_name', 'guarantor_nid', 'guarantor_nid_pic_font', 'guarantor_nid_pic_back', 'guarantor_pic', 'guarantor_address', 'guarantor_occupation', 'guarantor_monthly_income', 'guarantor_phone_number', 'guarantor_email', 'guarantor_relation'], 'Guarantor Information')}

//                 <div className="flex items-center justify-between">
//                     <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                         Create Client
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default ClientCreate;

import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

const ClientCreate = () => {
    const [formData, setFormData] = useState({
        name: '',
        father_name: '',
        mother_name: '',
        phone_number: '',
        date_of_birth: '',
        nid_number: '',
        nid_pic_font: null,
        nid_pic_back: null,
        pic: null,
        occupation: '',
        monthly_income: '',
        present_district: '',
        present_upazila: '',
        present_village: '',
        present_postcode: '',
        permanent_district: '',
        permanent_upazila: '',
        permanent_postcode: '',
        permanent_village: '',
        email: '',
        number: '',
        emergency_contact_name: '',
        guarantor_name: '',
        guarantor_nid: '',
        guarantor_nid_pic_font: null,
        guarantor_nid_pic_back: null,
        guarantor_pic: null,
        guarantor_address: '',
        guarantor_occupation: '',
        guarantor_monthly_income: '',
        guarantor_phone_number: '',
        guarantor_email: '',
        guarantor_relation: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Load images from localStorage on component mount
        const savedImages = JSON.parse(localStorage.getItem('clientFormImages')) || {};
        setFormData(prevData => ({ ...prevData, ...savedImages }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (file) {
            // Validate if the file is an image
            if (!file.type.startsWith('image/')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid File Type!',
                    text: 'Please upload a valid image file.',
                });
                return; // Prevent further actions if the file is not an image
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const newFormData = { ...formData, [name]: reader.result };
                setFormData(newFormData);

                // Save image to localStorage
                localStorage.setItem('clientFormImages', JSON.stringify({ [name]: reader.result }));
            };
            reader.readAsDataURL(file); // Read file as a base64 data URL
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post('/clients/store', formData, {
            onSuccess: (response) => {
                if (response.props.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: response.props.message,
                        timer: 2000,
                        showConfirmButton: false,
                    });

                    setFormData({
                        name: '',
                        father_name: '',
                        mother_name: '',
                        phone_number: '',
                        date_of_birth: '',
                        nid_number: '',
                        occupation: '',
                        monthly_income: '',
                        present_district: '',
                        present_upazila: '',
                        present_village: '',
                        present_postcode: '',
                        permanent_district: '',
                        permanent_upazila: '',
                        permanent_postcode: '',
                        permanent_village: '',
                        email: '',
                        number: '',
                        emergency_contact_name: '',
                        guarantor_name: '',
                        guarantor_nid: '',
                        guarantor_address: '',
                        guarantor_occupation: '',
                        guarantor_monthly_income: '',
                        guarantor_phone_number: '',
                        guarantor_email: '',
                        guarantor_relation: '',
                    });
                    setErrors({});
                    localStorage.removeItem('clientFormImages');
                }
            },
            onError: (error) => {
                if (error.response && error.response.status === 422) {
                    setErrors(error.response.data.errors);

                    // Handle the error and show SweetAlert for validation error
                    let errorMessage = 'Validation Error! Please check the form and correct the errors.';
                    let errorDetails = '';

                    // Loop through each error and prepare a message
                    for (const field in error.response.data.errors) {
                        errorDetails += `${field}: ${error.response.data.errors[field].join(', ')}\n`;
                    }

                    Swal.fire({
                        icon: 'error',
                        title: 'Validation Error!',
                        text: errorMessage,
                        footer: `<pre>${errorDetails}</pre>`, // Show detailed errors in footer
                        showConfirmButton: true,
                        customClass: {
                            popup: 'max-w-xl', // Adjusting the size of the popup
                        },
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Something went wrong. Please try again.',
                    });
                }
            },
        });
    };


    const renderFormSection = (fields, headline) => (
        <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">{headline}</h3>
            <div className="grid grid-cols-3 gap-4">
                {fields.map((field) => (
                    <div key={field}>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
                            {field.replace(/_/g, ' ').toUpperCase()} <span className="text-red-500">*</span>
                        </label>
                        {field.includes('pic') || field.includes('nid_pic') ? (
                            <>
                                <input
                                    type="file"
                                    name={field}
                                    id={field}
                                    onChange={handleFileChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {formData[field] && (
                                    <img src={formData[field]} alt={field} className="mt-2 w-20 h-20 object-cover" />
                                )}
                            </>
                        ) : (
                            <input
                                type={field === 'date_of_birth' ? 'date' : 'text'}
                                name={field}
                                id={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors[field] ? 'border-red-500' : ''}`}
                            />
                        )}
                        {errors[field] && <p className="text-red-500 text-xs italic">{errors[field][0]}</p>}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6">Create Client</h2>
            <form onSubmit={handleSubmit}>
                {renderFormSection(['name', 'father_name', 'mother_name', 'phone_number', 'date_of_birth'], 'Personal Information')}
                {renderFormSection(['nid_number', 'nid_pic_font', 'nid_pic_back', 'pic'], 'NID Information')}
                {renderFormSection(['occupation', 'monthly_income', 'present_district', 'present_upazila', 'present_village', 'present_postcode'], 'Present Address')}
                {renderFormSection(['permanent_district', 'permanent_upazila', 'permanent_village', 'permanent_postcode'], 'Permanent Address')}
                {renderFormSection(['email', 'number', 'emergency_contact_name', 'guarantor_name', 'guarantor_nid', 'guarantor_nid_pic_font', 'guarantor_nid_pic_back', 'guarantor_pic', 'guarantor_address', 'guarantor_occupation', 'guarantor_monthly_income', 'guarantor_phone_number', 'guarantor_email', 'guarantor_relation'], 'Guarantor Information')}

                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Create Client
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ClientCreate;
