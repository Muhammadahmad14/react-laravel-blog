<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class UserBlockMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $messageText;
    public string $subjectText;

    public function __construct($messageText, $subjectText)
    {
        $this->messageText = $messageText;
        $this->subjectText = $subjectText;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->subjectText
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.user_blocked',
        );
    }
}
