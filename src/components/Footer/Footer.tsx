import "./Footer.scss";

type FooterProps = {
  text: string;
};

const Footer = ({ text }: FooterProps) => {
  return (
    <footer>
      <section>
        <p>
          Made in Tokyo, Japan
          <br></br>
          ©2023 KINJO
        </p>
      </section>
      <section>
        <h3>KINJO</h3>
        <ul>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/tos">Terms Of Service</a></li>
          <li><a href="/jobs">Jobs</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </section>
      <section>
        <h3>Follow Us</h3>
        <ul>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>Twitter</li>
          <li>Youtube</li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
