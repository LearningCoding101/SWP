package click.badcourt.be.service;

import click.badcourt.be.entity.PaymentMethod;
import click.badcourt.be.model.request.PaymentMethodRequest;
import click.badcourt.be.repository.PaymentMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentMethodService {

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    public List<PaymentMethod> findAll() {
        return paymentMethodRepository.findAll();
    }
    public PaymentMethod addPaymentMethod(PaymentMethodRequest paymentMethodRequest) {
        PaymentMethod paymentMethod = new PaymentMethod();
        paymentMethod.setPaymentMethodName(paymentMethodRequest.getPaymentMethodName());
        paymentMethod.setPaymentInfo(paymentMethodRequest.getPaymentInfo());
        return paymentMethodRepository.save(paymentMethod);
    }

    public PaymentMethod updatePaymentMethod(PaymentMethodRequest paymentMethodRequest, Long id) {
        PaymentMethod paymentMethod = paymentMethodRepository.findById(id).orElseThrow(() -> new RuntimeException("Timeslot not found"));
        paymentMethod.setPaymentMethodName(paymentMethodRequest.getPaymentMethodName());
        paymentMethod.setPaymentInfo(paymentMethodRequest.getPaymentInfo());
        return paymentMethodRepository.save(paymentMethod);
    }

    public void deletePaymentMethod(Long id) {
        paymentMethodRepository.deleteById(id);
    }
}
