"use client";

import { FormEvent, useEffect, useState } from "react";

import styles from "../css/Withdraw.module.css";

import {
    collection,
    doc,
    getDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { useAuth } from "@/hooks/useAuth";

export default function Withdraw() {
    const { user } = useAuth();

    const [balance, setBalance] = useState(0);

    const [amount, setAmount] = useState("");

    const [bank, setBank] = useState("");

    const [name, setName] = useState("");

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

useEffect(() => {
    const fetchBalance = async () => {
        if (!user) return;

        try {
            const balanceRef = doc(
                db,
                "balances",
                user.uid
            );

            const snapshot =
                await getDoc(balanceRef);

            if (snapshot.exists()) {
                const data = snapshot.data();

                setBalance(
                    data.saldo || 0
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    fetchBalance();
}, [user]);
    // HANDLE WD
    const handleWithdraw = async (
        e: FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            setMessage("");

            const response = await fetch(
                "https://backend-production-74f5a.up.railway.app/withdraw/wd",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization: `Bearer ${await user?.getIdToken()}`,
                    },

                    body: JSON.stringify({
                        amount: Number(amount),

                        bank,

                        name,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message);

                return;
            }

            setMessage(
                "Withdraw berhasil diajukan"
            );

            setAmount("");

            setBank("");

            setName("");

            // update balance UI
            setBalance((prev) => prev - Number(amount));
        } catch (error) {
            console.log(error);

            setMessage("Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>

                <h1 className={styles.title}>
                    Withdraw Balance
                </h1>

                {/* BALANCE */}
                <div className={styles.balanceBox}>
                    <p className={styles.balanceLabel}>
                        Available Balance
                    </p>

                    <h2 className={styles.balance}>
                        Rp{" "}
                        {balance.toLocaleString(
                            "id-ID"
                        )}
                    </h2>
                </div>

                {/* MESSAGE */}
                {message && (
                    <div className={styles.message}>
                        {message}
                    </div>
                )}

                {/* FORM */}
                <form
                    className={styles.form}
                    onSubmit={handleWithdraw}
                >
                    <div className={styles.inputGroup}>
                        <label>Amount</label>

                        <input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) =>
                                setAmount(e.target.value)
                            }
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Bank Account</label>

                        <input
                            type="text"
                            placeholder="Bank account number"
                            value={bank}
                            onChange={(e) =>
                                setBank(e.target.value)
                            }
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Account Name</label>

                        <input
                            type="text"
                            placeholder="Your full name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={loading}
                    >
                        {loading
                            ? "Loading..."
                            : "Withdraw Now"}
                    </button>
                </form>
            </div>
        </div>
    );
}