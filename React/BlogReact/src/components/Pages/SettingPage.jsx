import Accordion from "../../components/Accordion";
import { useEffect, useState } from "react";
import ChangeEmail from "../User/Settings/ChangeEmail";
import ChangePassword from "../User/Settings/changePassword";
import ChangeStatus from "../User/Settings/ChangeStatus";
import Toast from "../Toast";
import { getUser } from "../../utils/auth";

export default function SettingPage() {
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

  return (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <div className="max-w-2xl mx-auto p-6">
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
          <ChangeEmail
            id={user?.id}
            onSuccess={() => showToast("Email successfully changed", "success")}
            onError={(msg) => showToast(msg, "error")}
          />
        </Accordion>

        <Accordion
          index={1}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
          label="Change Password"
          subtitle="Set a new password for your account"
        >
          <ChangePassword
            id={user?.id}
            onSuccess={() =>
              showToast("Password successfully changed", "success")
            }
            onError={(msg) => showToast(msg, "error")}
          />
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
