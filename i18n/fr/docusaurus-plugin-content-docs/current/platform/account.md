---
id: account
title: Compte, crédits et assistance
description: Inscription, connexion, récupération du mot de passe, sécurité du compte, recharges de crédits et récompenses, remboursements et canaux de contact.
sidebar_position: 2
update_docs: none
---

# Compte, crédits et assistance {#account}

## Inscription {#register}

Chaque produit dispose d'un point d'entrée pour l'inscription. S'inscrire depuis n'importe où crée le même compte ZAI : inscrivez-vous une seule fois et utilisez-le pour vous connecter à tous les produits.

| Où s'inscrire | Point d'entrée | Après l'inscription |
| --- | --- | --- |
| Site officiel | « Sign Up » en haut à droite, ou « No account yet? Sign Up » dans la fenêtre de connexion | Vous restez sur la page en cours après la connexion |
| Console développeur | « Go to Sign Up » en bas de la page de connexion | Vous êtes connecté automatiquement et redirigé vers la Console |
| Meet Zai | L'entrée d'inscription sur la page de connexion de [zai.gg](https://zai.gg) | Vous accédez au produit compagnon comme indiqué sur la page |
| ZaiDrama | Depuis la fenêtre de connexion, passez sur « Create your ZAI account » ; vous pouvez saisir un code d'invitation | Vous entrez directement dans ZaiDrama |

Lors de l'inscription avec une adresse e-mail :

- Vous devez saisir le code de vérification à 6 chiffres envoyé à votre adresse e-mail (valable 10 minutes ; renvoi possible après 60 secondes) ;
- Le mot de passe doit comporter au moins 6 caractères et inclure des lettres et des chiffres ;
- Chaque adresse e-mail ne peut être enregistrée qu'une seule fois. Si elle est déjà enregistrée, vous verrez « This email is already registered » : connectez-vous simplement.

Si vous avez discuté avec Zai sur la page d'accueil du site officiel avant de vous inscrire, cette conversation sera transférée dans votre nouveau compte.

## Connexion {#sign-in}

- Connectez-vous avec l'adresse e-mail et le mot de passe utilisés lors de l'inscription.
- Le site officiel, Meet Zai et ZaiDrama partagent la même connexion. Si vous disposez déjà d'une session active valide, vous pouvez entrer directement ; si la session a expiré ou si une vérification est requise, connectez-vous à nouveau comme indiqué sur la page.
- Lorsque la page de connexion propose la connexion Google, vous pouvez également choisir « Continue with Google » ; la première fois, un compte sera créé en suivant le parcours indiqué.
- Si vous êtes déjà connecté sur le site officiel, cliquer sur « Creation workspace » sur la page d'accueil vous amène dans ZaiDrama sans mot de passe.
- Les sessions de connexion se renouvellent automatiquement ; si trop d'appareils sont connectés au même compte simultanément, la session la plus ancienne sera déconnectée.

## Mot de passe oublié {#reset-password}

Dans la fenêtre de connexion, cliquez sur « Forgot password? », saisissez votre adresse e-mail enregistrée, puis définissez un nouveau mot de passe après avoir reçu le code de vérification. Afin de ne pas révéler si une adresse e-mail est enregistrée, la page indiquera également qu'un code a été envoyé lorsque vous saisissez une adresse non enregistrée.

## Sécurité du compte {#account-security}

Dans le « Profile » de ZaiDrama, vous pouvez :

- Modifier l'adresse e-mail liée (après modification, utilisez la nouvelle adresse pour vous connecter à tous les produits) ;
- Modifier votre mot de passe ;
- Consulter les « Logged-in devices » et vous déconnecter un à un des appareils inconnus ;
- Supprimer votre compte : saisissez votre adresse e-mail complète et votre mot de passe, examinez ce qui sera effacé, puis confirmez à nouveau. Après l'envoi, vous serez déconnecté ; le nettoyage des données peut prendre du temps, et le résultat affiché sur la page est définitif. La suppression du compte est irréversible.

Ne partagez jamais votre mot de passe, votre code de vérification ou vos clés API avec qui que ce soit, y compris toute personne prétendant être un membre de l'assistance.

## Crédits {#credits}

- **Un solde unique** : les crédits sont libellés en dollars américains. Le solde affiché en haut à droite de la Console développeur et le solde dans ZaiDrama correspondent au même compte. La génération d'images, de vidéos et de voix dans ZaiDrama, ainsi que les appels API aux modèles, sont tous déduits de ce solde ; discuter avec l'assistant sur le site officiel ne consomme pas de crédits de plateforme.
- **Recharge** : achetez des packs de recharge sur la page « Top up » de la Console développeur ou sur la page « Billing & Balance » de ZaiDrama. Chaque pack de recharge indique le montant crédité (en USD, y compris toute partie bonus) ; les packs affichés en CNY sont payés en CNY, mais le montant crédité reste un solde en USD. Les paiements sont traités par Stripe, qui prend en charge les cartes bancaires, Alipay et WeChat Pay. La plateforme ne stocke pas les données de carte ; les crédits Alipay et WeChat Pay peuvent être légèrement retardés, mais sont appliqués automatiquement une fois le paiement confirmé.
- **Sans expiration** : les crédits rechargés n'expirent jamais.
- **Tarifs unitaires** : les prix en USD de chaque modèle (par million de jetons ou par unité de facturation) sont indiqués sous « Pricing » dans la Console. Chaque génération ZaiDrama est facturée selon « tarif × utilisation », avec une précision de 0,0001 $ et un minimum de 0,0001 $ ; la carte de confirmation et la barre d'approbation affichent un devis avant de commencer.
- **Affichage** : les montants de type solde (solde en haut à droite, carte de solde, recharges et dépenses cumulées) affichent 2 décimales et sont tronqués vers le bas, par exemple `$1,234.56` ; en survolant, la valeur exacte avec 4 décimales apparaît. Les débits individuels, relevés, devis et éléments similaires affichent 4 décimales, par exemple `$0.0123`.
- **Historique** : l'onglet « Billing » de la page « Top up » de la Console et la page « Billing & Balance » de ZaiDrama affichent les recharges ; la consommation API figure sous « Usage » dans la Console, et le détail des déductions ZaiDrama sous « Billing & Balance ».

### Récompenses {#rewards}

Le « Welfare Center » de ZaiDrama propose :

- **Récompense de connexion quotidienne** : lorsque l'événement est actif et que vous remplissez les conditions, la connexion à ZaiDrama la réclame automatiquement ; lorsque la page propose un bouton de réclamation, vous pouvez également suivre les instructions. Les montants, la fréquence et les plafonds cumulés sont régis par les règles de l'événement en cours ;
- **Récompense de parrainage** : invitez de nouveaux utilisateurs via un lien ou un code d'invitation et recevez des crédits selon les règles de l'événement.

Les montants des récompenses sont crédités sur le même solde. Les montants précis sont indiqués sur la page du Welfare Center.

## Abonnements Meet Zai {#companion-plans}

Meet Zai utilise le même compte de plateforme, mais l'offre gratuite, Zai Plus, les réponses vocales et les minutes d'appel, ainsi que les packs additionnels, sont gérés sur la page d'abonnement du produit compagnon. Recharger des crédits de plateforme n'équivaut pas à acheter un abonnement et ne convertit pas le solde de crédits en minutes vocales.

Pour consulter les avantages actuels, les dates de renouvellement et les règles d'achat et d'expiration, voir [Abonnements et utilisation](../zai/plans-and-usage.md). Pour les opérations de chat, d'avatar et de mémoire, commencez par le [Guide de démarrage Meet Zai](../zai/getting-started.md).

## Remboursements {#refunds}

Les règles de remboursement figurent à la section 6, « Subscriptions, Payments & Refunds », des [Conditions d'utilisation](https://ourzai.com/legal/terms.html). Les règles spécifiques concernant les tarifs et les remboursements sont celles indiquées sur la page d'achat. Pour demander un remboursement, écrivez à support@ourzai.com avec votre adresse e-mail enregistrée et les détails de la commande.

## Contact et assistance {#support}

| Canal | Idéal pour | Qui peut l'utiliser |
| --- | --- | --- |
| Zai sur la page d'accueil du site officiel | Découvrir la plateforme, trouver la documentation, vérifier les modèles disponibles et les tarifs unitaires publics | Tout le monde, sans inscription |
| « New chat » de la Console développeur | Demander directement à Zai comment appeler les API ou choisir les modèles après connexion | Utilisateurs connectés |
| « Help & Feedback » de ZaiDrama | Problèmes rencontrés pendant la création ; assistance humaine en direct ; vous pouvez envoyer des captures d'écran | Utilisateurs ZaiDrama connectés |
| [Page de contact du site officiel](https://ourzai.com/contact) | Contacter l'assistance en direct ou consulter les autres canaux de contact | Tout le monde |
| support@ourzai.com | Problèmes de compte, demandes de remboursement, demandes commerciales | Tout le monde |

Si Zai sur la page d'accueil du site officiel est temporairement indisponible, un bouton « Transfer to human support » apparaît, et votre conversation précédente sera transmise à l'assistance avec vous.

## Conditions et confidentialité {#legal}

- [Conditions d'utilisation](https://ourzai.com/legal/terms.html) ([anglais](https://ourzai.com/legal/terms-en.html))
- [Politique de confidentialité](https://ourzai.com/legal/privacy.html) ([anglais](https://ourzai.com/legal/privacy-en.html))
