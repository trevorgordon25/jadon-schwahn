export default function ContactSection() {
    return (
        <section className="contact-section" id="contact">
            <div className="contact-left">
                <h2 className="contact-heading">Get in<br /><em>touch</em></h2>
                <p>For commissions, studio visits, and exhibition inquiries. Response within two business days.</p>
            </div>
            <div className="contact-right">
                <div className="contact-item">
                    <p className="contact-label">Email</p>
                    <a href="mailto:jadon@jadonschwahn.com" className="contact-value">jadon@jadonschwahn.com</a>
                </div>
                <div className="contact-item">
                    <p className="contact-label">Instagram</p>
                    <a href="#" className="contact-value">@jadonschwahn</a>
                </div>
                <div className="contact-item">
                    <p className="contact-label">Studio</p>
                    <span className="contact-value">Bozeman, Montana</span>
                </div>
            </div>
        </section>
    );
}
