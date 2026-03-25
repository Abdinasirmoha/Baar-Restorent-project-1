import { useEffect, useMemo, useState } from "react";
import { useProfile } from "../context/ProfileContext";

function Profile() {
  const { profile, updateProfile, resetProfile } = useProfile();
  const [form, setForm] = useState(profile);
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    setForm(profile);
  }, [profile]);

  const initials = useMemo(() => {
    const words = (form.name || "").trim().split(" ").filter(Boolean);
    if (words.length === 0) return "GU";
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }, [form.name]);

  const onChangeField = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onUploadAvatar = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatusText("Please choose an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, avatar: String(reader.result) }));
      setStatusText("Image ready. Click Save Profile.");
    };
    reader.readAsDataURL(file);
  };

  const onSave = () => {
    updateProfile(form);
    setStatusText("Profile saved successfully.");
  };

  const onReset = () => {
    resetProfile();
    setStatusText("Profile reset to default.");
  };

  return (
    <section className="min-h-[70vh] bg-[#fffaf3] px-6 py-14 md:px-12">
      <div className="mx-auto w-full max-w-3xl rounded-3xl border border-orange-100 bg-white p-8 shadow-lg md:p-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FF6B35]">My Account</p>
            <h1 className="mt-2 text-3xl font-black text-slate-800">Profile</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onReset}
              className="rounded-xl border border-orange-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onSave}
              className="rounded-xl bg-[#e25a27] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#c94a1b]"
            >
              Save Profile
            </button>
          </div>
        </div>

        <div className="mt-7 flex flex-col items-start gap-4 rounded-2xl bg-[#fff8ec] p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            {form.avatar ? (
              <img
                src={form.avatar}
                alt="Profile"
                className="h-16 w-16 rounded-full border-2 border-[#f4c0a7] object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#f4c0a7] bg-[#ffe8dc] text-lg font-black text-[#b34c25]">
                {initials}
              </div>
            )}
            <div>
              <p className="text-sm font-black text-slate-800">Profile Photo</p>
              <p className="text-xs text-slate-500">Upload your own image for the whole system.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="cursor-pointer rounded-xl border border-orange-200 px-4 py-2 text-sm font-bold text-slate-700 hover:border-[#FF6B35] hover:text-[#FF6B35]">
              Upload Image
              <input type="file" accept="image/*" className="hidden" onChange={onUploadAvatar} />
            </label>
            <button
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, avatar: "" }))}
              className="rounded-xl border border-[#eed7ce] px-4 py-2 text-sm font-bold text-slate-600 hover:text-[#c94a1b]"
            >
              Remove
            </button>
          </div>
        </div>

        {statusText && <p className="mt-4 text-sm font-semibold text-[#c94a1b]">{statusText}</p>}

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-[#fff8ec] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Name</p>
            <input
              name="name"
              value={form.name}
              onChange={onChangeField}
              className="mt-2 w-full rounded-xl border border-[#efd8cd] bg-white px-3 py-2 text-base font-bold text-slate-800 outline-none"
            />
          </div>
          <div className="rounded-2xl bg-[#fff8ec] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
            <input
              name="email"
              value={form.email}
              onChange={onChangeField}
              className="mt-2 w-full rounded-xl border border-[#efd8cd] bg-white px-3 py-2 text-base font-bold text-slate-800 outline-none"
            />
          </div>
          <div className="rounded-2xl bg-[#fff8ec] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</p>
            <input
              name="phone"
              value={form.phone}
              onChange={onChangeField}
              className="mt-2 w-full rounded-xl border border-[#efd8cd] bg-white px-3 py-2 text-base font-bold text-slate-800 outline-none"
            />
          </div>
          <div className="rounded-2xl bg-[#fff8ec] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Member Since</p>
            <input
              name="memberSince"
              value={form.memberSince}
              onChange={onChangeField}
              className="mt-2 w-full rounded-xl border border-[#efd8cd] bg-white px-3 py-2 text-base font-bold text-slate-800 outline-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
