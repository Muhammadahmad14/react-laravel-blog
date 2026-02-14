import Accordion from "../../components/Accordion";
import { useEffect, useState } from "react";
import ChangeEmail from "../../components/User/Settings/ChangeEmail";
import ChangePassword from "../../components/User/Settings/changePassword";
import ChangeStatus from "../../components/User/Settings/ChangeStatus";
import Toast from "../../components/Toast";
import { getUser } from "../../utils/auth";

function SettingPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    setUser(getUser());
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const isSocialUser = user?.google_id;

  return (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <div className="max-w-2xl mx-auto p-6 over">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Settings
        </h1>
        <Accordion
          index={0}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
          label="Change Email"
          subtitle="Update your account email address"
        >
          {isSocialUser ? (
            <p className="text-gray-500 dark:text-gray-400">
              You are logged in via Google. Email cannot be changed here.
            </p>
          ) : (
            <ChangeEmail
              id={user?.id}
              onSuccess={() =>
                showToast("Email successfully changed", "success")
              }
              onError={(msg) => showToast(msg, "error")}
            />
          )}
        </Accordion>
        <Accordion
          index={1}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
          label="Change Password"
          subtitle="Set a new password for your account"
        >
          {isSocialUser ? (
            <p className="text-gray-500 dark:text-gray-400">
              You are logged in via Google. Password cannot be changed here.
            </p>
          ) : (
            <ChangePassword
              id={user?.id}
              onSuccess={() =>
                showToast("Password successfully changed", "success")
              }
              onError={(msg) => showToast(msg, "error")}
            />
          )}
        </Accordion>
        <Accordion
          index={2}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
          label="Who can see Your Profile?"
          subtitle="Control your profile visibility"
        >
          <ChangeStatus
            userData={user}
            onSuccess={() =>
              showToast("Profile visibility successfully changed", "success")
            }
            onError={(msg) => showToast(msg, "error")}
          />
        </Accordion>
      </div>
    </>
  );
}
export default SettingPage;
