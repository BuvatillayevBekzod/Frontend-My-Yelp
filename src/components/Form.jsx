import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Form = ({ itemCollectionRef, getItemList }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [city, setCity] = useState("");

    let auth = getAuth();

    const onSubmitItem = async (e) => {
        e.preventDefault();
        try {
            await addDoc(itemCollectionRef, {
                name,
                description,
                city,
                userId: auth?.currentUser?.uid,
            });
            setName("");
            setDescription("");
            setCity("");

            getItemList();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={onSubmitItem} className="form-container">
            <h2 className="form-title">Add Restaurant</h2>
            <div className="form-group">
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <input
                    type="text"
                    id="description"
                    className="form-control"
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="city" className="form-label">
                    City
                </label>
                <input
                    type="text"
                    id="city"
                    className="form-control"
                    placeholder="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Add New
            </button>
        </form>
    );
};

export default Form;
