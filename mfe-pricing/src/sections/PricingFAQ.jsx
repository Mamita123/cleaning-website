import React, { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function PricingFAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(-1);

  const isFi = t.home === "Etusivu";

  const faqs = isFi ? [
    {
      question: "Mitä kotitalousvähennys tarkoittaa ja miten se toimii?",
      answer: "Kotitalousvähennys on suomalainen verovähennys. Voit vähentää jopa 40% siivouspalveluiden työkustannuksista veroistasi. Pyydä meiltä lasku ja varmistamme, että se sopii verovähennykseen.",
    },
    {
      question: "Voinko peruuttaa suunnitelmani milloin tahansa?",
      answer: "Kyllä! Ei ole sopimuksia tai sitoumuksia. Voit peruuttaa, keskeyttää tai muuttaa suunnitelmaasi milloin tahansa ilman maksuja.",
    },
    {
      question: "Mitä jos en ole tyytyväinen siivoukseen?",
      answer: "Tarjoamme 100% tyytyväisyystakuun. Jos et ole tyytyväinen, ota yhteyttä 24 tunnin kuluessa ja tulemme siivoamaan uudelleen ilmaiseksi.",
    },
    {
      question: "Pitääkö minun olla kotona siivouksen aikana?",
      answer: "Ei — monet asiakkaat antavat meille avaimen tai ovikoodi. Sinun täytyy olla saatavilla vain ensimmäisellä kerralla.",
    },
    {
      question: "Ovatko puhdistustuotteet turvallisia lapsille ja lemmikeille?",
      answer: "Kyllä. Käytämme ympäristöystävällisiä, myrkyttömiä tuotteita. Ekologisessa suunnitelmassa kaikki tuotteet ovat sertifioituja luonnontuotteita.",
    },
    {
      question: "Miten maksan?",
      answer: "Maksu veloitetaan verkossa jokaisen siivouksen jälkeen kortilla. Saat laskun sähköpostiin. Käteistä ei tarvita.",
    },
  ] : [
    {
      question: "What is kotitalousvähennys and how does it work?",
      answer: "Kotitalousvähennys is a Finnish household tax deduction. You can deduct up to 40% of the labour cost of cleaning services from your taxes. Ask us for a proper invoice and we will make sure it is tax deduction compatible.",
    },
    {
      question: "Can I cancel my plan anytime?",
      answer: "Yes! There are no contracts or commitments. You can cancel, pause, or change your plan at any time with no fees.",
    },
    {
      question: "What if I am not happy with the clean?",
      answer: "We offer a 100% satisfaction guarantee. If you are not happy, contact us within 24 hours and we will re-clean your home for free.",
    },
    {
      question: "Do I need to be home during the cleaning?",
      answer: "No — many customers give us a key or door code. You just need to be available for the first visit to walk us through your preferences.",
    },
    {
      question: "Are your cleaning products safe for children and pets?",
      answer: "Yes. We use eco-friendly, non-toxic products as standard. If you choose our Eco-Friendly plan, every product is certified organic.",
    },
    {
      question: "How do I pay?",
      answer: "Payment is taken online after each clean via card. You will receive an invoice by email. No cash needed.",
    },
  ];

  return (
    <section style={{
      padding: "80px 24px",
      backgroundColor: "var(--bg-secondary)",
    }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: "800",
            color: "var(--text-heading)",
            marginBottom: "12px",
          }}>
            {t.faqTitle}
          </h2>
          <p style={{
            fontSize: "1rem",
            color: "var(--text-secondary)",
            lineHeight: "1.7",
          }}>
            {t.faqSubtitle}
          </p>
        </div>

        {/* ✅ FAQ accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "var(--bg-card)",
                borderRadius: "16px",
                border: openIndex === index
                  ? "1.5px solid #14b8a6"
                  : "1.5px solid var(--border-color)",
                overflow: "hidden",
                transition: "border 0.2s",
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 24px",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: "16px",
                }}
              >
                <span style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "var(--text-primary)",
                  lineHeight: "1.4",
                }}>
                  {faq.question}
                </span>
                <span style={{
                  fontSize: "20px",
                  color: "#14b8a6",
                  fontWeight: "700",
                  flexShrink: 0,
                  transform: openIndex === index ? "rotate(45deg)" : "rotate(0)",
                  transition: "transform 0.2s",
                  display: "inline-block",
                }}>
                  +
                </span>
              </button>

              {openIndex === index && (
                <div style={{
                  padding: "0 24px 20px",
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: "1.7",
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ✅ CTA */}
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <p style={{
            color: "var(--text-secondary)",
            fontSize: "15px",
            marginBottom: "16px",
          }}>
            {t.stillQuestions}
          </p>
          <a href="/contact" style={{
            backgroundColor: "#14b8a6",
            color: "white",
            fontSize: "15px",
            fontWeight: "700",
            padding: "14px 32px",
            borderRadius: "12px",
            textDecoration: "none",
            boxShadow: "0 4px 12px rgba(20,184,166,0.3)",
            display: "inline-block",
          }}>
            💬 {t.contactUs}
          </a>
        </div>

      </div>
    </section>
  );
}