package com.ticketflow.config;

import com.ticketflow.entity.*;
import com.ticketflow.repository.CategoryRepository;
import com.ticketflow.repository.TicketRepository;
import com.ticketflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedCategories();
        seedUsers();
        seedTickets();
    }

    private void seedCategories() {
        if (categoryRepository.count() == 0) {
            log.info("Seeding initial categories...");
            List<Category> categories = List.of(
                    Category.builder().name("IT Hardware").description("Laptops, monitors, keyboards, printers, and physical hardware issues").build(),
                    Category.builder().name("Software & Applications").description("Software installation, license requests, crashes, and app errors").build(),
                    Category.builder().name("Network & VPN").description("Wi-Fi connectivity, VPN issues, firewall access, and network latency").build(),
                    Category.builder().name("Access & Permissions").description("Password resets, account lockouts, OAuth/SSO access, and security permissions").build(),
                    Category.builder().name("General Support").description("General IT support inquiries and miscellanous requests").build()
            );
            categoryRepository.saveAll(categories);
            log.info("Successfully seeded {} categories.", categories.size());
        }
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            log.info("Seeding default test users...");
            User admin = User.builder()
                    .email("admin@ticketflow.com")
                    .password(passwordEncoder.encode("TicketFlow2026!"))
                    .fullName("System Administrator")
                    .role(Role.ADMIN)
                    .build();

            User agent = User.builder()
                    .email("agent@ticketflow.com")
                    .password(passwordEncoder.encode("TicketFlow2026!"))
                    .fullName("Support Agent Jane")
                    .role(Role.AGENT)
                    .build();

            User employee = User.builder()
                    .email("employee@ticketflow.com")
                    .password(passwordEncoder.encode("TicketFlow2026!"))
                    .fullName("Employee John Doe")
                    .role(Role.EMPLOYEE)
                    .build();

            userRepository.saveAll(List.of(admin, agent, employee));
            log.info("Successfully seeded default test users: admin@ticketflow.com, agent@ticketflow.com, employee@ticketflow.com (password: TicketFlow2026!)");
        }
    }

    private void seedTickets() {
        if (ticketRepository.count() == 0) {
            log.info("Seeding pre-populated IT tickets...");

            User employee = userRepository.findByEmail("employee@ticketflow.com").orElse(null);
            User agent = userRepository.findByEmail("agent@ticketflow.com").orElse(null);
            User admin = userRepository.findByEmail("admin@ticketflow.com").orElse(null);

            Category hardware = categoryRepository.findByName("IT Hardware").orElse(null);
            Category software = categoryRepository.findByName("Software & Applications").orElse(null);
            Category network = categoryRepository.findByName("Network & VPN").orElse(null);
            Category access = categoryRepository.findByName("Access & Permissions").orElse(null);
            Category general = categoryRepository.findByName("General Support").orElse(null);

            if (employee == null || hardware == null) return;

            List<Ticket> sampleTickets = List.of(
                    Ticket.builder()
                            .title("Cannot connect to corporate Cisco VPN from home")
                            .description("I am receiving Error 800 when attempting to authenticate to the US-East VPN server. Restarted router but problem persists.")
                            .status(Status.OPEN)
                            .priority(Priority.HIGH)
                            .category(network)
                            .createdBy(employee)
                            .aiSuggestedPriority(Priority.HIGH)
                            .aiSuggestedCategory(network)
                            .aiSuggestedResponse("Hello John! Please verify your MFA Authenticator app prompt on your mobile device. If approved, try clearing the Cisco AnyConnect profile cache.")
                            .build(),

                    Ticket.builder()
                            .title("Laptop screen flickers violently and turns pitch black")
                            .description("My MacBook Pro screen goes completely dark when unplugged from the power adapter. Requires hard restart.")
                            .status(Status.IN_PROGRESS)
                            .priority(Priority.CRITICAL)
                            .category(hardware)
                            .createdBy(employee)
                            .assignedTo(agent)
                            .aiSuggestedPriority(Priority.CRITICAL)
                            .aiSuggestedCategory(hardware)
                            .aiSuggestedResponse("Hello John, this indicates a power distribution GPU fault. Please bring your laptop to the 3rd Floor IT Bar for an immediate loaner swap.")
                            .build(),

                    Ticket.builder()
                            .title("Slack SSO authentication failing after domain password reset")
                            .description("I updated my corporate AD password today. Gmail and Jira work, but Slack refuses OAuth sign-in.")
                            .status(Status.RESOLVED)
                            .priority(Priority.MEDIUM)
                            .category(access)
                            .createdBy(employee)
                            .assignedTo(agent)
                            .aiSuggestedPriority(Priority.MEDIUM)
                            .aiSuggestedCategory(access)
                            .aiSuggestedResponse("Hello John, your Okta SSO token for Slack was invalidated. Please clear browser cookies for okta.company.com and sign back in.")
                            .build(),

                    Ticket.builder()
                            .title("Request for JetBrains IntelliJ IDEA Ultimate License")
                            .description("Joining the backend core team today and need an active JetBrains organizational license key.")
                            .status(Status.OPEN)
                            .priority(Priority.LOW)
                            .category(software)
                            .createdBy(employee)
                            .aiSuggestedPriority(Priority.LOW)
                            .aiSuggestedCategory(software)
                            .aiSuggestedResponse("Hello John, license requests require engineering manager approval on Jira portal. Once approved, the license key will be provisioned automatically.")
                            .build(),

                    Ticket.builder()
                            .title("Production Server Latency Spike on US-East-1 Cluster")
                            .description("API gateway latency spiked from 45ms to 1200ms. High CPU utilization detected on node pods.")
                            .status(Status.OPEN)
                            .priority(Priority.CRITICAL)
                            .category(network)
                            .createdBy(employee)
                            .aiSuggestedPriority(Priority.CRITICAL)
                            .aiSuggestedCategory(network)
                            .aiSuggestedResponse("CRITICAL INCIDENT ALERT: Notifying DevOps On-Call rotation via PagerDuty. Initiating cluster scale-up.")
                            .build(),

                    Ticket.builder()
                            .title("Secondary 4K Monitor resolution locked at 1080p")
                            .description("Connected Dell 4K monitor via USB-C hub, but display settings only show 1920x1080 resolution options.")
                            .status(Status.CLOSED)
                            .priority(Priority.LOW)
                            .category(hardware)
                            .createdBy(employee)
                            .assignedTo(agent)
                            .build(),

                    Ticket.builder()
                            .title("Docker Desktop authorization daemon communication failure")
                            .description("Executing docker run returns daemon socket permission denied error on macOS Sonoma.")
                            .status(Status.IN_PROGRESS)
                            .priority(Priority.HIGH)
                            .category(software)
                            .createdBy(employee)
                            .assignedTo(agent)
                            .aiSuggestedPriority(Priority.HIGH)
                            .aiSuggestedCategory(software)
                            .aiSuggestedResponse("Hello John, please run sudo chown root:docker /var/run/docker.sock or check Docker Desktop Preferences > Security Settings.")
                            .build(),

                    Ticket.builder()
                            .title("Physical security badge access revoked for 4th floor server room")
                            .description("Tapped badge at 4th floor door access controller but reader flashed red access denied.")
                            .status(Status.OPEN)
                            .priority(Priority.HIGH)
                            .category(access)
                            .createdBy(employee)
                            .build(),

                    Ticket.builder()
                            .title("Git SSH key permission denied (publickey)")
                            .description("Unable to push commits to internal GitLab repository after generating new Ed25519 SSH keypair.")
                            .status(Status.IN_PROGRESS)
                            .priority(Priority.MEDIUM)
                            .category(access)
                            .createdBy(employee)
                            .assignedTo(admin)
                            .build(),

                    Ticket.builder()
                            .title("Need printer drivers installed for HR Department HP LaserJet")
                            .description("Switched to new Windows 11 laptop and printer is not auto-discovered on corporate subnet.")
                            .status(Status.RESOLVED)
                            .priority(Priority.LOW)
                            .category(general)
                            .createdBy(employee)
                            .assignedTo(agent)
                            .build(),

                    Ticket.builder()
                            .title("Zoom desktop client crashing during screen sharing on dual displays")
                            .description("Whenever I share desktop 2 during team standup, Zoom application crashes completely without crash report.")
                            .status(Status.OPEN)
                            .priority(Priority.MEDIUM)
                            .category(software)
                            .createdBy(employee)
                            .build(),

                    Ticket.builder()
                            .title("Outlook mailbox storage quota 95% full warning")
                            .description("Received automated Exchange warning that mailbox has reached 47.5 GB out of 50 GB limit.")
                            .status(Status.OPEN)
                            .priority(Priority.LOW)
                            .category(software)
                            .createdBy(employee)
                            .build()
            );

            ticketRepository.saveAll(sampleTickets);
            log.info("Successfully pre-seeded {} realistic IT support tickets.", sampleTickets.size());
        }
    }
}
