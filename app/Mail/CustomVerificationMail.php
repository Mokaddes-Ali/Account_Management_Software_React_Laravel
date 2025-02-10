<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class CustomVerificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Custom Verification Mail',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'Mails.VerifyEmail',
            with: [
                'name' => $this->user->name,
                'verificationUrl' => route('verification.verify', ['id' => $this->user->id, 'hash' => sha1($this->user->email)]),
                'dashboardUrl' => route('dashboard'),
            ]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
