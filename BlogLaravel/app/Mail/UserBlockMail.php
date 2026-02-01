<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class UserBlockMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $messageBody;
    public $subjectLine;

    public function __construct($messageBody, $subjectLine)
    {
        $this->messageBody = $messageBody;
        $this->subjectLine = $subjectLine;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->subjectLine,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.user_blocked',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
