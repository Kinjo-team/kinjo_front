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
          ©2023 Kinjo
        </p>
      </section>
      <section>
        <h3>Kinjo</h3>
        <ul>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/tos">Terms Of Service</a></li>
          <li>Jobs</li>
          <li>Contact Us</li>
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
