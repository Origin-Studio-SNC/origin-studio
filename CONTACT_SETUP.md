# Page Contact - Configuration

## Variables d'environnement requises

Ajoutez ces variables dans votre fichier `.env.local` :

```bash
# Secret pour la signature des nonces (générer une clé aléatoire forte)
FORM_SECRET=your-secret-key-here-change-in-production
```

## Protections anti-spam implémentées

### 1. Honeypot
Un champ caché que seuls les bots rempliront. Si rempli → rejet.

### 2. Time-gate
Minimum 2 secondes entre l'affichage et la soumission du formulaire.

### 3. Nonce signé (HMAC)
Token unique généré côté serveur, valide 1 heure, vérifié à chaque soumission.

### 4. Rate limiting
Maximum 5 soumissions par IP/User-Agent sur une fenêtre de 15 minutes.

### 5. Obfuscation des contacts
- Les emails et téléphones ne sont **jamais** présents en clair dans le HTML
- Reconstruction côté client uniquement au clic utilisateur
- Fragments séparés dans le code pour éviter le scraping

## Configuration email (à faire)

### Option recommandée : Infomaniak

```typescript
// Dans src/app/api/contact/submit/route.ts
// Remplacer le console.log par :

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'mail.infomaniak.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

await transporter.sendMail({
  from: process.env.SMTP_USER,
  to: 'contact@origin-studio.ch',
  subject: `Nouveau message de ${name}`,
  text: message,
  html: `
    <h2>Nouveau message de contact</h2>
    <p><strong>Nom :</strong> ${name}</p>
    <p><strong>Email :</strong> ${email}</p>
    ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ''}
    <p><strong>Message :</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `,
});
```

Variables d'environnement à ajouter :
```bash
SMTP_USER=your-email@origin-studio.ch
SMTP_PASSWORD=your-password
```

## Tests de sécurité

### Test 1 : Honeypot
```bash
curl -X POST http://localhost:3000/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test","website_url":"spam","nonce":"valid-nonce"}'
```
Résultat attendu : 422 Invalid submission

### Test 2 : Soumission rapide (<2s)
Soumettre le formulaire immédiatement après chargement.
Résultat attendu : Rejet client-side

### Test 3 : Nonce invalide
```bash
curl -X POST http://localhost:3000/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test","nonce":"invalid"}'
```
Résultat attendu : 422 Invalid security token

### Test 4 : Rate limiting
Soumettre 6 fois rapidement.
Résultat attendu : 429 Too many requests à la 6ème

### Test 5 : Email non présent dans le HTML
```bash
curl http://localhost:3000/contact | grep -i "contact@origin-studio"
```
Résultat attendu : Aucun résultat

## Production

Pour la production, considérez :

1. **Redis** pour le rate limiting (au lieu de Map en mémoire)
2. **Logs structurés** (Winston, Pino) avec rotation
3. **Monitoring** des soumissions (nombre, sources, taux de succès)
4. **Backup** des messages dans une base de données (optionnel)
5. **Alertes** en cas de pic de soumissions suspectes

## Accessibilité

- ✅ Labels visibles pour tous les champs
- ✅ Messages d'erreur liés aux champs (aria-invalid)
- ✅ Focus ring visible
- ✅ Boutons avec hit area confortable
- ✅ Formulaire utilisable au clavier uniquement
