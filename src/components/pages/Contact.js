import React from "react";

function Contact() {
  return (
    <div className="contact-page" style={{ zIndex: 2, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div className="links">
        <h4 style={{ color: 'white', marginTop: '250px' }}>Link to Our GitHub</h4>
        <a className="github-link" href="https://github.com/NicholasBean/Totl/tree/sprint-two">
          <img
            src={"https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"}
            alt="Github Link"
            title="Github Link"
            height="100"
          />
        </a>
        <a href="https://github.com/users/NicholasBean/projects/1/views/2"><h4 style={{ color: 'white', marginTop: '20px' }}>Link to Our Project</h4></a>
      </div>
    </div>
  );
}

export default Contact;
