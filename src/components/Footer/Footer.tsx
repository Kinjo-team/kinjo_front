import "./Footer.scss"

type FooterProps = {
    text: string
}

const Footer = ({text} : FooterProps) => {
  return (
    <footer>
        <section>
            <p>Made in Tokyo Japan 
              <br></br>
              ©2023 Kinjo
            </p>
        </section>
        <section>
            <h3>Kinjo</h3>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
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
  )
}

export default Footer