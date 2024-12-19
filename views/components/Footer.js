'use client'

import React from 'react'
import "@/views/style/Footer.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const FooterAll = () => {
  return (
    <>
    <footer class="footer-all py-5">
      <div class="div-infor-top container">

        <div class="row">
          <div class="infor1 col-4">
            <img class="foot-logo" src='/Untitled1.png' />
            <h2 class="foot-title">Our auction website is an online platform that allows buying<br />            and selling goods and services through auction</h2>
          </div>

          <div class="infor2 col-4">
            <h2 class="foot-title1">Sign up to keep up with the latest products and updates. Let{`'`}s get started!</h2>
            <div class="input-group">
              <input class="form-control" placeholder="Enter your email address" />
              <div class="input-group-append">
                <button class="but-foot btn" type="button">Subscribe</button>
              </div>
            </div>
          </div>
          <div class="infor3 col-4">
            <div class="col-infor3 col-6">
              <h3 class="contact">Follow Us</h3>
              <div class="div-follow">
                <img class="img-contact" src='/fb.svg' />
                <img class="img-contact" src='/twitter.svg' />
                <img class="img-contact" src='/in.svg' />
              </div>
            </div>
            <div class="col-infor3 col-6">
              <h3 class="contact">Call Us</h3>
              <a class="phone" href='#'>0855548202</a>
            </div>
          </div>
        </div>

        <hr />

        <div class="copyright container">
            <a class="copy-link" href='#'>Privacy Policy</a>
            <a class="copy-link" href='#'>Terms of Use</a>
            <a class="copy-link" href='#'>Sales and Refunds</a>
            <a class="copy-link" href='#'>Legal</a>
        </div>
      </div>
    </footer>
          
    </>
  )
}

export default FooterAll;