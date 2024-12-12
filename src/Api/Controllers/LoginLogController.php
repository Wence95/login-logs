<?php

namespace HospitalClinicoPuq\LoginLogs\Api\Controllers;

use Flarum\Api\Controller\AbstractListController;
use Illuminate\Database\ConnectionInterface;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class LoginLogController extends AbstractListController
{
    public $serializer = \HospitalClinicoPuq\LoginLogs\Api\Serializer\LoginLogSerializer::class;

    protected $db;

    public function __construct(ConnectionInterface $db)
    {
        $this->db = $db;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $actor->assertAdmin();  // Ensure only admins can access the logs

        $logs = $this->db->table('login_logs')
            ->join('users', 'users.id', '=', 'login_logs.user_id')
            ->select('users.username', 'login_logs.logged_in_at', 'login_logs.logged_out_at', 'login_logs.id')
            ->orderBy('login_logs.logged_in_at', 'desc')
            ->get();

        // Make sure each log has an ID
        return $logs->map(function ($log) {
            $log->id = $log->id; // Ensure the ID is available
            return $log;
        });
    }
}
