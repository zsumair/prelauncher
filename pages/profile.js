import Layout from "@/components/ui/layout/Layout";
import React from "react";

function Profile() {
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
                    <div className="w-24 rounded-full">
                      <img src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNob2VzfGVufDB8fDB8fA%3D%3D&w=1000&q=80" />
                    </div>
                  </div>
                  <div className="md:ml-4 md:pl-4">
                    <p className="pb-4">
                      Upload a avatar to use for your profile
                    </p>
                    <input
                      type="file"
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
                    className="input input-bordered w-full max-w-xs"
                  />
                  <label className="label">
                    <span className="label-text-alt">Name is Required</span>
                  </label>
                </div>
              </div>

              <div className="card-actions">
                <button className="btn btn-primary">Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
