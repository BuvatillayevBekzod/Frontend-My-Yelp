import Form from "./Form";
import Table from "./Table";
import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../firebase/config";
import { getDocs, collection } from "firebase/firestore";
import "./styles/Main.css";
import Avatar from "@mui/material/Avatar";

const Main = ({ accountList, getAccountList }) => {
    const [itemList, setItemList] = useState([]);
    const [userId, setUserId] = useState("");
    const currentEmail = getAuth().currentUser;

    const userName = accountList.filter(
        (acc) => acc.email === currentEmail.email
    )[0]?.userName;

    const itemCollectionRef = collection(db, "restaurants");

    const getItemList = async () => {
        try {
            const data = await getDocs(itemCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                itemId: doc.itemId,
            }));

            setItemList(filteredData);
            setUserId(getAuth()?.currentUser?.uid);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAccountList();
        getItemList();
    }, [accountList]);

    const logoutHandler = () => {
        signOut(getAuth());
    };
    return (
        <div className="mainContainer">
            <div className="header">
                <div className="logo-container">
                    <img src="./yelp-logo.png" alt="logo" />
                </div>
                <div className="header-right">
                    <div className="user-info">
                        <p className="username">{userName && userName}</p>
                        <div className="avatar-container">
                            <Avatar
                                className="avatar"
                                sx={{ background: "" }}
                            ></Avatar>
                        </div>
                    </div>
                    <button className="logout-button" onClick={logoutHandler}>
                        Logout
                    </button>
                </div>
            </div>
            <div className="content">
                <div className="form-container">
                    <Form
                        itemCollectionRef={itemCollectionRef}
                        getItemList={getItemList}
                    />
                </div>
                <div className="table-container">
                    <Table itemList={itemList} userId={userId} />
                </div>
            </div>
        </div>
    );
};

export default Main;
