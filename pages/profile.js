import Layout from "@/components/ui/layout/Layout";
import { UserContext } from "@/contexts/UserContext";
import { useEffect, useState, useRef } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ImageUploader from "@/lib/ImageUploader";

function Profile() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    fetchUser();
  }, [session?.user?.id]);

  const handleInput = (e) => {
    const value = e.target.value;
    setName(value);
  };

  async function handleImagePreview(e) {
    setError(null);
    setLoading(true);
    let file = e.target.files[0];
    let data = await ImageUploader(file, "prelauncher_avatar");
    if (data) {
      setLoading(false);
      setAvatarImage(data?.secure_url);
      fileInputRef.current.value = null;
    } else {
      setLoading(false);
      toast.error(" Oops, error updating avatar ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      fileInputRef.current.value = null;
    }
  }

  async function updateUser() {
    setSuccess(true);
    await supabase
      .from("profiles")
      .update({
        name,
        avatar: avatarImage,
      })
      .eq("id", session?.user?.id)
      .then((res) => {
        console.log("res", res);
        if (res.error) {
          setSuccess(false);
          toast.error(" Oops, error updating profile, try again ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }
        // setName(res.)
        setSuccess(false);
        toast.success("Your profile is updated  ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }

  async function fetchUser() {
    try {
      if (session) {
        await supabase
          .from("profiles")
          .select()
          .eq("id", session?.user?.id)
          .then((res) => {
            // console.log("res", res);
            setName(res?.data[0]?.name);
            setAvatarImage(res?.data[0]?.avatar);
            // setProfile(res?.data[0]);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="py-12 md:py-24 w-5/6">
          <h2 className="text-center text-xl">Profile Settings</h2>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="mb-8 pb-7">
                <h2 className="text-lg">Avatar</h2>
                <div className="divider"></div>
                <div className="md:flex block">
                  <div className="avatar md:pb-0 pb-4">
                    <div className="w-24 rounded-full relative">
                      {/* <div className="badge badge-md "></div> */}
                      {loading ? (
                        <button className="btn btn-ghost btn-lg absolute top-6 left-6 loading"></button>
                      ) : (
                        ""
                      )}
                      <img
                        className={loading ? "opacity-5" : ""}
                        src={
                          avatarImage
                            ? avatarImage
                            : "https://cdn.pixabay.com/photo/2017/09/13/11/12/emoji-2745224_960_720.png"
                        }
                      />
                    </div>
                  </div>
                  <div className="form-control md:ml-4 md:pl-4">
                    <p className="pb-4">
                      Upload a avatar to use for your profile
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImagePreview}
                      className="file-input md:w-full md:file-input-md file-input-sm  max-w-xs"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <h2 className="text-lg">Profile</h2>
                <div className="divider"></div>

                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Your name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    value={name}
                    onChange={handleInput}
                    className="input input-bordered w-full max-w-xs"
                    required
                  />
                  <label className="label">
                    <span className="label-text-alt">Name is Required</span>
                  </label>
                </div>
              </div>

              <div className="card-actions">
                <button
                  className={
                    success
                      ? "btn dark:bg-zinc-100 dark:hover:bg-zinc-100 dark:text-black loading"
                      : "btn dark:bg-zinc-100 dark:hover:bg-zinc-100 dark:text-black"
                  }
                  onClick={updateUser}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
