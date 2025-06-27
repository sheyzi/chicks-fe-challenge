<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<!-- Social Media Icons -->
			<div class="social-section">
				<div class="social-icons">
					<a href="#" class="social-link facebook" aria-label="Facebook">
						<iconify-icon icon="gg:facebook" width="24" height="24"></iconify-icon>
					</a>
					<a href="#" class="social-link instagram" aria-label="Instagram">
						<iconify-icon icon="mdi:instagram" width="24" height="24"></iconify-icon>
					</a>
					<a href="#" class="social-link twitter" aria-label="Twitter">
						<iconify-icon icon="mdi:twitter" width="24" height="24"></iconify-icon>
					</a>
					<a href="#" class="social-link discord" aria-label="Discord">
						<iconify-icon icon="ic:baseline-discord" width="24" height="24"></iconify-icon>
					</a>
				</div>
			</div>

			<!-- Main Footer Columns -->
			<div class="footer-columns">
				<!-- Company Info -->
				<div class="footer-column">
					<div class="logo-section">
						<div class="logo">
							<img src="/logo.svg" alt="Chicks Gold" class="footer-logo" />
						</div>
						<a href="mailto:support@chicksgold.com" class="support-email">
							support@chicksgold.com
						</a>
					</div>
				</div>

				<!-- Chicks Gold -->
				<div class="footer-column">
					<h3 class="column-title">Chicks Gold</h3>
					<ul class="footer-links">
						<li><a href="#">Games</a></li>
						<li><a href="#">About Us</a></li>
						<li><a href="#">Blog</a></li>
						<li><a href="#">Sitemap</a></li>
					</ul>
				</div>

				<!-- Support -->
				<div class="footer-column">
					<h3 class="column-title">Support</h3>
					<ul class="footer-links">
						<li><a href="#">Contact Us</a></li>
						<li><a href="#">FAQ</a></li>
					</ul>
				</div>

				<!-- Legal -->
				<div class="footer-column">
					<h3 class="column-title">Legal</h3>
					<ul class="footer-links">
						<li><a href="#">Privacy Policy</a></li>
						<li><a href="#">Terms of Service</a></li>
						<li><a href="#">Copyright Policy</a></li>
					</ul>
				</div>

				<!-- Trustpilot Reviews -->
				<div class="footer-column">
					<div class="trustpilot-section">
						<div class="trustpilot-stars">
							{#each [1, 2, 3, 4, 5] as star}
								<img src="/icons/star.svg" class="star filled" width="16" height="16" alt="Star" />
							{/each}
						</div>
						<span class="trustpilot-text">Trustpilot Reviews</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Copyright -->
		<div class="footer-bottom">
			<p class="copyright">© 2017 - 2020 Chicksgold.com. All Rights Reserved</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		background-color: var(--background-color);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--spacing-lg);
	}

	.footer-content {
		padding: calc(var(--spacing-xl) + var(--spacing-lg)) 0 var(--spacing-lg);
	}

	.social-section {
		margin-bottom: var(--spacing-lg);
	}

	.social-icons {
		display: flex;
		gap: var(--spacing-md);
		justify-content: flex-start;
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		text-decoration: none;
		transition: var(--transition-normal);
		color: #fff;
	}

	.social-link.facebook {
		background-color: #1877f2;
	}

	.social-link.instagram {
		background: linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4);
	}

	.social-link.twitter {
		background-color: #1da1f2;
	}

	.social-link.discord {
		background-color: #5865f2;
	}

	.social-link:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	.footer-columns {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		gap: var(--spacing-xl);
		margin-bottom: var(--spacing-lg);
		border-top: 1px solid var(--border-color);
		padding-top: var(--spacing-lg);
	}

	.footer-column {
		display: flex;
		flex-direction: column;
	}

	.logo-section {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.footer-logo {
		height: 40px;
		width: auto;
		filter: brightness(0.8);
	}

	.support-email {
		color: var(--text-color-muted);
		text-decoration: none;
		font-size: var(--font-size-sm);
		transition: color var(--transition-normal);
	}

	.support-email:hover {
		color: var(--text-color);
	}

	.column-title {
		color: var(--text-color);
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-semibold);
		margin-bottom: var(--spacing-md);
		margin-top: 0;
	}

	.footer-links {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.footer-links a {
		color: var(--text-color-muted);
		text-decoration: none;
		font-size: var(--font-size-sm);
		transition: color var(--transition-normal);
	}

	.footer-links a:hover {
		color: var(--text-color);
	}

	.trustpilot-section {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
	}

	.trustpilot-stars {
		display: flex;
		gap: 2px;
	}

	.star.filled {
		color: #00b67a;
	}

	.trustpilot-text {
		color: var(--text-color-muted);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-medium);
	}

	.footer-bottom {
		padding: var(--spacing-lg) 0;
		text-align: center;
	}

	.copyright {
		color: var(--text-color-muted);
		font-size: var(--font-size-sm);
		margin: 0;
	}

	@media (max-width: 1024px) {
		.footer-columns {
			grid-template-columns: repeat(3, 1fr);
			gap: var(--spacing-lg);
		}
	}

	@media (max-width: 768px) {
		.container {
			padding: 0 var(--spacing-sm);
		}

		.footer-content {
			padding: var(--spacing-lg) 0 var(--spacing-md);
		}

		.footer-columns {
			grid-template-columns: repeat(2, 1fr);
			gap: var(--spacing-lg);
		}

		.social-icons {
			justify-content: center;
		}
	}

	@media (max-width: 480px) {
		.footer-columns {
			grid-template-columns: 1fr;
			gap: var(--spacing-lg);
		}

		.footer-column {
			text-align: center;
		}

		.logo-section {
			align-items: center;
		}

		.trustpilot-section {
			justify-content: center;
		}
	}
</style>
