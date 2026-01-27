# Guide de test - Page d'avis

## 🧪 Tests à effectuer

### 1. Test basique
1. Ouvrir http://localhost:3001/fr/review
2. Remplir tous les champs requis
3. Soumettre le formulaire
4. Vérifier :
   - ✅ Message de succès affiché
   - ✅ Email de confirmation reçu
   - ✅ Message Discord reçu sur le webhook

### 2. Test avec image
1. Ouvrir http://localhost:3001/fr/review
2. Remplir le formulaire
3. Ajouter une image (max 20 Mo)
4. Soumettre
5. Vérifier :
   - ✅ Aperçu de l'image avant envoi
   - ✅ Image sauvegardée dans `/public/uploads/`
   - ✅ Nom de fichier au format UUID
   - ✅ Image visible dans l'email et Discord

### 3. Test de pré-remplissage
1. Ouvrir http://localhost:3001/fr/review?firstName=Test&lastName=User&email=test@example.com&company=Test%20Company
2. Vérifier que les champs sont pré-remplis
3. Compléter les champs manquants
4. Soumettre

### 4. Tests de validation

#### Champs requis
- [ ] Soumettre sans prénom → Erreur
- [ ] Soumettre sans nom → Erreur
- [ ] Soumettre sans email → Erreur
- [ ] Soumettre sans note → Erreur
- [ ] Soumettre sans texte → Erreur

#### Format email
- [ ] Email invalide (test@) → Erreur
- [ ] Email invalide (@test.com) → Erreur
- [ ] Email valide (test@test.com) → OK

#### Texte de l'avis
- [ ] Texte trop court (< 20 caractères) → Erreur
- [ ] Texte valide (≥ 20 caractères) → OK

#### Image
- [ ] Image > 20 Mo → Erreur
- [ ] Fichier non-image (PDF, etc.) → Erreur
- [ ] Image valide < 20 Mo → OK

### 5. Tests de sécurité

#### Anti-spam
- [ ] Soumettre immédiatement (< 2 secondes) → Erreur
- [ ] Remplir le champ honeypot → Erreur (invisible pour l'utilisateur)
- [ ] Soumettre 4 fois de suite → Rate limit atteint

#### Nonce
- [ ] Désactiver JavaScript et soumettre → Erreur (pas de nonce)
- [ ] Soumettre avec nonce expiré → Erreur

### 6. Tests multilingues
- [ ] Français : http://localhost:3001/fr/review
- [ ] Anglais : http://localhost:3001/en/review
- [ ] Allemand : http://localhost:3001/de/review

### 7. Tests responsive
- [ ] Desktop (> 1024px)
- [ ] Tablet (768px - 1024px)
- [ ] Mobile (< 768px)

## 🔍 Points de vérification

### Email de confirmation
- [ ] From: Origin Studio
- [ ] To: Email du client
- [ ] Subject: "Merci pour votre avis - Origin Studio"
- [ ] Contient : Nom complet, note, texte de l'avis
- [ ] Contient l'image (si fournie)
- [ ] Design cohérent avec les autres emails

### Discord Webhook
- [ ] Embed avec couleur (vert si ≥4, orange si ≥3, rouge sinon)
- [ ] Champ "Client" avec nom + entreprise
- [ ] Champ "Email"
- [ ] Champ "Note" avec étoiles
- [ ] Champ "Avis" avec le texte
- [ ] Miniature avec l'image (si fournie)
- [ ] Timestamp correct
- [ ] Footer "Origin Studio - Système d'avis"

### Upload d'images
- [ ] Image sauvegardée dans `/public/uploads/`
- [ ] Nom au format UUID : `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.ext`
- [ ] Fichier accessible via `/uploads/filename.ext`
- [ ] Gitignore fonctionne (fichier non tracké)

## 🐛 Debugging

### Si l'email n'est pas envoyé
1. Vérifier les variables d'environnement SMTP
2. Vérifier les logs serveur
3. Tester avec un autre email

### Si le webhook Discord ne fonctionne pas
1. Vérifier l'URL du webhook
2. Tester manuellement avec curl (voir README)
3. Vérifier les logs serveur

### Si l'image n'est pas sauvegardée
1. Vérifier les permissions du dossier `/public/uploads/`
2. Vérifier les logs serveur
3. Vérifier la taille de l'image (max 20 Mo)

## ✅ Checklist finale
- [ ] Tous les tests de validation passent
- [ ] Email de confirmation fonctionne
- [ ] Webhook Discord fonctionne
- [ ] Upload d'images fonctionne
- [ ] Pré-remplissage depuis URL fonctionne
- [ ] Anti-spam fonctionne
- [ ] Les 3 langues fonctionnent
- [ ] Responsive fonctionne
- [ ] Page non visible dans navigation/footer
