import React from "react";
function Contact() {
  return (
  <div className="contact-page">
    <div className="page-heading">
      <h1>Contact</h1>
    </div>
    <h4>Link to Our GitHub</h4>
    <a className="github-link" href="https://github.com/NicholasBean/Totl/tree/sprint-two">
      <img
        src={"https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"}
        alt="Github Link"
        title="Github Link"
        height="100"
        />
    </a>
    <a href="https://github.com/users/NicholasBean/projects/1/views/2"><h4>Link to Our Project</h4></a>
  </div>
  );
}

export default Contact;
