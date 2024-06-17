package click.badcourt.be.api;

import click.badcourt.be.entity.PaymentMethod;
import click.badcourt.be.model.request.PaymentMethodRequest;
import click.badcourt.be.service.PaymentMethodService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment-methods")
@SecurityRequirement(name = "api")
public class PaymentMethodApi {

    @Autowired
    private PaymentMethodService paymentMethodService;

    @GetMapping
    public ResponseEntity<List<PaymentMethod>> getAllPaymentMethods() {
        return ResponseEntity.ok(paymentMethodService.findAll());
    }

    @PostMapping
    public ResponseEntity<PaymentMethod> addPaymentMethod(@RequestBody PaymentMethodRequest request) {
        PaymentMethod createdPaymentMethod = paymentMethodService.addPaymentMethod(request);
        return ResponseEntity.ok(createdPaymentMethod);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaymentMethod> updatePaymentMethod(@PathVariable Long id, @RequestBody PaymentMethodRequest request) {
        PaymentMethod updatedPaymentMethod = paymentMethodService.updatePaymentMethod(request, id);
        return ResponseEntity.ok(updatedPaymentMethod);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaymentMethod(@PathVariable Long id) {
        paymentMethodService.deletePaymentMethod(id);
        return ResponseEntity.noContent().build();
    }
}

