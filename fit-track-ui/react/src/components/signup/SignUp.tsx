import {useState} from "react";
import "./signup.scss";
import {useNavigate} from "react-router-dom";
import {createCustomer} from "../../services/client";

export const SignUp = () => {
    const generateAgeOptions = () => {
        const options = [];
        for (let age = 18; age <= 80; age++) {
            options.push(
                <option key={age} value={age}>
                    {age}
                </option>
            );
        }
        return options;
    };


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        memberSince: new Date()

    });

    const [passwordError, setPasswordError] = useState("");
    const [selectError, setSelectError] = useState("");

    const navigate = useNavigate();


    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}));

        if (name === "password") {
            if (value.length >= 6) {
                setPasswordError("");
            }

        }
        if (name === "age" || name === "gender") {
            if (value.length > 0) {
                setSelectError("");
            }
        }

    };
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (formData.password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            return;
        }

        if (formData.age === "" || formData.gender === "") {
            setSelectError("Missing input data");
            return;
        }

        await createCustomer(formData).then(() => {
            navigate("/login");
        });
    };


    return (
        <div className="signup-form">
            <div className="signup-logo">
                <img src="/assets/weight.png" alt="Gym Icon " className="gym-icon"/>
                Fit Track
            </div>
            <div className="signup-form-container">
                <h2>Create a Fit Track Account</h2>
                <form onSubmit={handleSubmit}>
                    {/* Form fields go here */}
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}/>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} 
                            onChange={handleChange}/>
                        {passwordError && (<div className="error-message">{passwordError}</div>)}
                    </div>
                    <div className="form-group inline">
                        <div className="form-subgroup">
                            <label htmlFor="age">Age</label>
                            <select className="signup-select" id="age" name="age" value={formData.age} onChange={handleChange}>
                                <option value="">Select age</option>
                                {generateAgeOptions()}
                            </select>
                        </div>
                        <div className="form-subgroup">
                            <label htmlFor="gender">Gender</label>
                            <select className="signup-select" id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Forbidden">Forbidden</option>
                            </select>
                        </div>
                    </div>
                    {selectError && (<div className="error-message">{selectError}</div>)}
                    {/* Other form fields */}
                    <button type="submit">Create Account</button>
                </form>
                <a href="/login">Already have an account? Login</a>
            </div>
        </div>
    );
};

export default SignUp;