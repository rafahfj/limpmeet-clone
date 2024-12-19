import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateBio } from "../../config/redux/action/auth";

export default function ChangeBio() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const [input, setInput] = useState("");
  const [succes, setSuccess] = useState(false);

  const handleSubmit = async () => {
    const res = await dispatch(updateBio(input));
    if (res) {
      console.log(res);
      setSuccess(true);
    }
  };

  return (
    <div className="popup-changes">
      {succes ? (
        <div className="text-center">
          <h1>Bio Updated</h1>
          <button onClick={() => navigate(-1)} className="std-button">
            Go Back
          </button>
        </div>
      ) : (
        <>
          <h1>Input Bio</h1>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-2/3"
          ></textarea>
          <div className="flex gap-5">
            <button className="std-button" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button
              className="std-button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
