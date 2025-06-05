import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa6";

const FollowOn = () => {
  return (
    <div className="faded-text pt-2">
      <span>Follow on:</span>
      <div className="flex gap-4 pt-3">
        <a href="https://github.com/Kushal1402">
          <FaGithub size={20} />
        </a>
        <a href="https://www.instagram.com/kushal1402">
          <FaInstagram size={20} />
        </a>
        <a href="www.linkedin.com/in/kushaldoshi14">
          <FaLinkedin size={20} />
        </a>
      </div>
    </div>
  );
};

export default FollowOn;
