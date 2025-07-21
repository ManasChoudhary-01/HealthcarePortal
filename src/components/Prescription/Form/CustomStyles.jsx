export const customSelectStyles = {
    control: (provided) => ({
        ...provided,
        border: '2px solid #EDEDEC',
        outline: 'none',
        minHeight: '60px',
        width: '1000px',
        backgroundColor: '#fff',
        boxShadow: 'none',
        borderRadius: '8px',
        "&:hover": {
            borderColor: "none",
        },
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#73726E',
        fontSize: '16px',
        backgroundColor: '#fff',
        padding: '6px',
    }),
    singleValue: (provided) => ({
        ...provided,
        fontSize: '16px',
        color: '#32302C',
        backgroundColor: '#fff',
        padding: '16px',
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: "#EDF6FF", // Transparent background for selected options
        padding: "6px 16px",
        borderRadius: "26px",
        margin: "8px",
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: "#32302C", // Text color for selected options
        fontSize: "17px",
        fontWeight: "600",
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        transform: "translateX(4px)", // Adjust vertical alignment
        color: "#32302C", // Color for the remove icon
        "&:hover": {
            backgroundColor: "transparent", // No hover effect for remove icon
            color: "#E53935", // Hover color for the remove icon
        },
        cursor: "pointer",
        svg: {
            width: "20px",
            height: "20px",
        },
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        "& svg": {
            width: "24px",
            height: "24px",
            fill: "#32302C", // Change arrow color
        },
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        width: "0",
    }),
    clearIndicator: (provided) => ({
        ...provided,
        color: "#32302C",
        "&:hover": {
            color: "#E53935",
        },
        cursor: "pointer",
    }),
};

const baseSelectStyles = {
    control: (provided) => ({
        ...provided,
        border: '2px solid #EDEDEC',
        outline: 'none',
        height: '56px',
        backgroundColor: '#fff',
        boxShadow: 'none',
        borderRadius: '8px',
        "&:hover": {
            borderColor: "none",
        },
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#73726E',
        fontSize: '16px',
        backgroundColor: '#fff',
        padding: '6px',
    }),
    singleValue: (provided) => ({
        ...provided,
        fontSize: '16px',
        color: '#32302C',
        backgroundColor: '#fff',
        padding: '16px',
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: "#EDF6FF", // Transparent background for selected options
        padding: "6px 16px",
        borderRadius: "26px",
        margin: "8px",
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: "#32302C", // Text color for selected options
        fontSize: "17px",
        fontWeight: "600",
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        transform: "translateX(4px)", // Adjust vertical alignment
        color: "#32302C", // Color for the remove icon
        "&:hover": {
            backgroundColor: "transparent", // No hover effect for remove icon
            color: "#E53935", // Hover color for the remove icon
        },
        cursor: "pointer",
        svg: {
            width: "20px",
            height: "20px",
        },
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        "& svg": {
            fill: "#32302C", // Change arrow color
        },
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        width: "0",
    }),
    clearIndicator: (provided) => ({
        ...provided,
        display: 'none', // Hide the clear indicator
    }),
};

export const getCustomSelectStyles = (width) => ({
  ...baseSelectStyles,
  control: (provided) => ({
    ...baseSelectStyles.control(provided),
    width,
  }),
});