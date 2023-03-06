import Layout from "@/components/ui/layout/Layout";
import React from "react";

function PrivacyPolicy() {
  return (
    <Layout>
      <h2 className="font-bold uppercase mt-5 mb-6 pb-6 underline text-xl text-center">
        Privacy Terms
      </h2>
      <p className="font-mono mb-4">
        This page is used to inform website visitors regarding our policies with
        the collection, use, and disclosure of Personal Information if anyone
        decided to use our Service, the Website Name. If you choose to use our
        Service, then you agree to the collection and use of information in
        relation with this policy. The Personal Information that we collect are
        used for providing and improving the Service. We will not use or share
        your information with anyone except as described in this Privacy Policy.
        The terms used in this Privacy Policy have the same meanings as in our
        Terms and Conditions, which is accessible at Website URL, unless
        otherwise defined in this Privacy Policy.
      </p>
      <h3 className="font-bold uppercase mb-2">Log Data</h3>
      <p className="font-mono mb-5">
        We want to inform you that whenever you visit our Service, we collect
        information that your browser sends to us that is called Log Data. This
        Log Data may include information such as your computer's Internet
        Protocol (“IP”) address, browser version, pages of our Service that you
        visit, the time and date of your visit, the time spent on those pages,
        and other statistics.
      </p>
      <h3 className="font-bold uppercase mb-2">
        Information Collection and Use
      </h3>
      <p className="font-mono mb-5">
        For a better experience while using our Service, we may require you to
        provide us with certain personally identifiable information, including
        but not limited to your name, product name, website url, logo and
        billing address(if that required). The information that we collect will
        be used to contact or identify you.
      </p>
      <h3 className="font-bold uppercase mb-2">Security</h3>
      <p className="font-mono mb-5">
        We value your trust in providing us your Personal Information, thus we
        are striving to use commercially acceptable means of protecting it. But
        remember that no method of transmission over the internet, or method of
        electronic storage is 100% secure and reliable, and we cannot guarantee
        its absolute security.
      </p>
      <h3 className="font-bold uppercase mb-2">
        Changes to This Privacy Policy
      </h3>
      <p className="font-mono mb-5">
        We may update our Privacy Policy from time to time. Thus, we advise you
        to review this page periodically for any changes. We will notify you of
        any changes by posting the new Privacy Policy on this page. These
        changes are effective immediately, after they are posted on this page.
      </p>
      <h3 className="font-bold uppercase mb-2">Contact Us</h3>
      <p className="font-mono mb-5">
        If you have any questions or suggestions about our Privacy Policy, do
        not hesitate to contact us.
      </p>
    </Layout>
  );
}

export default PrivacyPolicy;
