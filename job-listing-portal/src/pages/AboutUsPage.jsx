import '../styles/AboutUsPage.css';

const AboutUsPage = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <h1>About Our Company</h1>
                    <p>Building a better future, one job at a time.</p>
                </div>
            </section>

            {/* Our Mission */}
            <section className="mission">
                <div className="container">
                    <h2>Our Mission</h2>
                    <p>
                        At [Your Company], our mission is to connect talented individuals with opportunities that empower
                        them to grow and succeed. We believe in creating a world where everyone can find the right job
                        that aligns with their goals and passions.
                    </p>
                </div>
            </section>

            {/* Our Core Values */}
            <section className="values">
                <div className="container">
                    <h2>Our Core Values</h2>
                    <div className="values-grid">
                        <div className="value">
                            <h3>Innovation</h3>
                            <p>We continuously innovate to provide the best services and experiences to job seekers and employers alike.</p>
                        </div>
                        <div className="value">
                            <h3>Integrity</h3>
                            <p>We operate with honesty and transparency, making sure to uphold the trust placed in us by our users.</p>
                        </div>
                        <div className="value">
                            <h3>Community</h3>
                            <p>We foster a supportive and inclusive environment that brings people together for mutual success.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team */}
            <section className="team">
                <div className="container">
                    <h2>Our Team</h2>
                    <div className="team-grid">
                        <div className="team-member">
                            <img src="team-member-1.jpg" alt="Team Member 1" />
                            <h3>John Doe</h3>
                            <p>CEO & Founder</p>
                        </div>
                        <div className="team-member">
                            <img src="team-member-2.jpg" alt="Team Member 2" />
                            <h3>Jane Smith</h3>
                            <p>CTO</p>
                        </div>
                        <div className="team-member">
                            <img src="team-member-3.jpg" alt="Team Member 3" />
                            <h3>Sam Wilson</h3>
                            <p>Lead Designer</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Join Us */}
            <section className="join-us">
                <div className="container">
                    <h2>Join Us</h2>
                    <p>
                        We are always looking for passionate individuals to join our team. If you're driven to make an
                        impact and contribute to our mission, we'd love to hear from you.
                    </p>
                </div>
            </section>
        </div>
    );

}

export default AboutUsPage
