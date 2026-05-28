"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { signOut } from "firebase/auth";

import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";

import styles from "./admin.module.css";
type WithdrawType = {
  uid: string;
  wdId: string;
  amount: number;
  bank: string;
  name: string;
  status: string;
}; 

type UserType = {
  uid: string;
  username: string;
  email: string;
 verifikasi?: boolean;
  spotify?: string;
  yt?: string;
  uploadedAt?: string;
};

export default function AdminPage() {
  const [users, setUsers] = useState<UserType[]>([]);
const [withdraws, setWithdraws] =
  useState<WithdrawType[]>([]);
  const { user } = useAuth();

  const router = useRouter();

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, "users"));

    const data = snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    })) as UserType[];

    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = async (uid: string) => {
    try {
      await updateDoc(doc(db, "users", uid), {
        verified: true,
      });

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (uid: string) => {
    try {
      await updateDoc(doc(db, "users", uid), {
        verified: false,
      });

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);

    router.replace("/Login");
  };


  const fetchWithdraws = async () => {
  try {
    const usersSnap = await getDocs(
      collection(db, "balances")
    );

    let allWithdraws: WithdrawType[] = [];

    for (const userDoc of usersSnap.docs) {
      const uid = userDoc.id;

      const wdSnap = await getDocs(
        collection(
          db,
          "balances",
          uid,
          "withdraw_history"
        )
      );

      const wdData = wdSnap.docs.map((doc) => ({
        uid,
        wdId: doc.id,
        ...doc.data(),
      })) as WithdrawType[];

      allWithdraws.push(...wdData);
    }

    setWithdraws(allWithdraws);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchUsers();
  fetchWithdraws();
}, []);



const handleApproveWithdraw =
  async (
    uid: string,
    wdId: string
  ) => {
    try {
      // doc saldo user
      const balanceRef = doc(
        db,
        "balances",
        uid
      );

      // doc withdraw user
      const wdRef = doc(
        db,
        "balances",
        uid,
       "withdraw_history",
        wdId
      );

      // get withdraw
      const wdSnap =
        await getDoc(wdRef);

      if (!wdSnap.exists()) {
        return alert(
          "Withdraw tidak ditemukan"
        );
      }

      const wdData =
        wdSnap.data();

      const amount =
        wdData.amount || 0;

      // get balance
      const balanceSnap =
        await getDoc(balanceRef);

      const currentSaldo =
        balanceSnap.data()?.saldo || 0;

      // validasi
      if (
        currentSaldo < amount
      ) {
        return alert(
          "Saldo tidak cukup"
        );
      }

      // kurangi saldo
      await updateDoc(
        balanceRef,
        {
          saldo:
            currentSaldo -
            amount,
        }
      );

      // approve wd
      await updateDoc(
        wdRef,
        {
          status:
            "approved",
          approvedAt:
            serverTimestamp(),
        }
      );

      fetchWithdraws();
    } catch (error) {
      console.log(error);
    }
  };
const handleRejectWithdraw =
  async (
    uid: string,
    wdId: string
  ) => {
    try {
      const wdRef = doc(
        db,
        "balances",
        uid,
       "withdraw_history",
        wdId
      );

      await updateDoc(
        wdRef,
        {
          status:
            "rejected",
          rejectedAt:
            serverTimestamp(),
        }
      );

      fetchWithdraws();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        {/* HEADER */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>
              Admin Dashboard
            </h1>

            <p className={styles.subtitle}>
              Kelola verifikasi akun user
            </p>
          </div>

          <button
            onClick={handleLogout}
            className={styles.logoutBtn}
          >
            Logout
          </button>
        </div>

        {/* STATS */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <p>Total Users</p>
            <h2>{users.length}</h2>
          </div>

          <div className={styles.statCard}>
            <p>Verified</p>

            <h2>
              {
                users.filter((u) => u.verifikasi)
                  .length
              }
            </h2>
          </div>

          <div className={styles.statCard}>
            <p>Pending</p>

            <h2>
              {
                users.filter((u) => !u.verifikasi)
                  .length
              }
            </h2>
          </div>
        </div>

        {/* TABLE */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Spotify</th>
                <th>YouTube</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((item) => (
                <tr key={item.uid}>
                  <td>{item.username}</td>

                  <td>{item.email}</td>

                  <td>{item.spotify || "0"}%</td>

                  <td>{item.yt || "0"}%</td>

                  <td>
                    {item.verifikasi ? (
                      <span
                        className={styles.active}
                      >
                        Verified
                      </span>
                    ) : (
                      <span
                        className={styles.pending}
                      >
                        Pending
                      </span>
                    )}
                  </td>

                  <td>
                    <div className={styles.actionRow}>
                      <button
                        onClick={() =>
                          handleApprove(item.uid)
                        }
                        className={styles.approveBtn}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleReject(item.uid)
                        }
                        className={styles.rejectBtn}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>




      {/* WITHDRAW SECTION */}

<div className={styles.withdrawSection}>
  
  <div className={styles.sectionHeader}>
    <h2>Withdraw Requests</h2>
  </div>

  <div className={styles.tableWrapper}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>UID</th>
          <th>Name</th>
          <th>Bank</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {withdraws.map((item) => (
          <tr key={item.wdId}>
            
            <td>{item.uid}</td>

            <td>{item.name}</td>

            <td>{item.bank}</td>

            <td>
              Rp{" "}
              {item.amount.toLocaleString(
                "id-ID"
              )}
            </td>

            <td>
              {item.status ===
              "approved" ? (
                <span
                  className={styles.active}
                >
                  Approved
                </span>
              ) : item.status ===
                "rejected" ? (
                <span
                  className={styles.reject}
                >
                  Rejected
                </span>
              ) : (
                <span
                  className={styles.pending}
                >
                  Pending
                </span>
              )}
            </td>

            <td>
              <div
                className={styles.actionRow}
              >
                <button
                  onClick={() =>
                    handleApproveWithdraw(
                      item.uid,
                      item.wdId
                    )
                  }
                  className={
                    styles.approveBtn
                  }
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    handleRejectWithdraw(
                      item.uid,
                      item.wdId
                    )
                  }
                  className={
                    styles.rejectBtn
                  }
                >
                  Reject
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    </div>
  );
}