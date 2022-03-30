import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, order, handleCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();
  
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'});
        console.log(token);
        setCheckoutToken(token);
      } catch (error) {

      }
    }

    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
  const backStep = () => setActiveStep(prevActiveStep => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  }

  const Confirmation = () => {
    return (
      <>
        <div>
          <Typography variant="h5">Thank you for your purchase, firstName lastName</Typography>
          <Divider className={classes.divider}/>
          <Typography variant="subtitle2">Order ref: ref</Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
      </>
    );
  }

  const Form = () => activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} next={next}/>
    : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} handleCaptureCheckout={handleCaptureCheckout}/>

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center"></Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(step => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  );
}

export default Checkout