<?php

namespace App\Console\Commands;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;

class ExpireBlueTick extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:expire-blue-tick';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Expire blue tick for users whose subscription ended';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        User::whereNotNull('blue_tick_expires_at')
            ->where('blue_tick_expires_at', '<', Carbon::now())
            ->update([
                'has_blue_tick' => false,
                'blue_tick_expires_at' => null,
                'updated_at' => Carbon::now(),
            ]);

        $this->info('Expired Blue Tick is Updated');
        return Command::SUCCESS;
    }
}
