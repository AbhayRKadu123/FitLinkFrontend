import "../styles/TermsAndCondition.css"
import HeadingContainer from "../components/HeadingContainer"
export default function TermsAndCondition() {

    return <div className="TermsAndCondition">
<HeadingContainer Title={'Terms and Condition'}></HeadingContainer>
<div className="TermsAndConditionInnerContainer">
  <h2>1. Acceptance of Terms</h2>
  <p>
    By accessing or using this fitness social media application, you agree to
    be bound by these Terms and Conditions. If you do not agree with any part of
    these terms, please do not use the app.
  </p>

  <h2>2. Purpose of the App</h2>
  <p>
    This app is designed to help users track workouts, share fitness progress,
    connect with other fitness enthusiasts, and stay motivated. The content
    provided is for informational purposes only and should not be considered
    medical advice.
  </p>

  <h2>3. User Responsibilities</h2>
  <ul>
    <li>You are responsible for maintaining the confidentiality of your account.</li>
    <li>You must provide accurate and truthful information.</li>
    <li>You agree not to post offensive, abusive, or misleading content.</li>
  </ul>

  <h2>4. Health Disclaimer</h2>
  <p>
    Always consult a doctor or qualified professional before starting any
    workout or diet plan. The app is not responsible for injuries, health issues,
    or damages resulting from workouts performed using information from the app.
  </p>

  <h2>5. User-Generated Content</h2>
  <p>
    You retain ownership of the content you post, such as workout logs, images,
    or comments. By posting content, you grant us permission to display and
    distribute it within the app.
  </p>

  <h2>6. Prohibited Activities</h2>
  <ul>
    <li>Spreading spam or promotional content without permission</li>
    <li>Harassment, hate speech, or bullying</li>
    <li>Attempting to hack or misuse the platform</li>
  </ul>

  <h2>7. Account Termination</h2>
  <p>
    We reserve the right to suspend or terminate accounts that violate these
    terms without prior notice.
  </p>

  <h2>8. Privacy</h2>
  <p>
    Your privacy is important to us. Please review our Privacy Policy to
    understand how we collect and use your data.
  </p>

  <h2>9. Changes to Terms</h2>
  <p>
    We may update these Terms and Conditions at any time. Continued use of the
    app means you accept the revised terms.
  </p>

  <h2>10. Contact Us</h2>
  <p style={{marginBottom:'0.3rem'}}>
    If you have any questions regarding these Terms and Conditions, please
    contact us through the support section of the app.
  </p>
</div>


    </div>
}