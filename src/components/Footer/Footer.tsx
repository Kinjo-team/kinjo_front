import "./Footer.scss"

type FooterProps = {
    text: string
}

const Footer = ({text} : FooterProps) => {
  return (
    <footer>{text}</footer>
  )
}

export default Footer